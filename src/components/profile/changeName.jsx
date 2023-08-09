import { Button, Flex, FormLabel, Input, useToast, FormControl, InputGroup, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { ButtomTemp } from "../general/button";

export const ChangeName = () => {
    
    const token = localStorage.getItem("token");

    const { name } = useSelector(state => state.userSlice.value)

    const nameSchema = Yup.object().shape({
        name: Yup.string()
        .required("Name is required")
        .matches(/^[A-Za-z .,']+$/, "Name must not have numbers or symbols")
    })

    const toast = useToast()

    const handleName = async(value) => {
        try {
            await axios.patch("http://localhost:8000/api/users/name", value, {
                headers: {
                    authorization:`Bearer ${token}`
                }
            })
            toast({
                title:'Name Updated',
                status: 'success',
                isClosable: true,
                duration: 1500
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
            toast({
                title: `Name Update Failed`,
                description: 'Please try again later',
                status: 'error',
                isClosable: true,
                duration: 1500
            })
        }
    }

    return (
        <>
            <Formik
            initialValues={{ name: '' }}
            validationSchema={nameSchema}
            onSubmit= {(value, action) => {
                handleName(value)
                action.resetForm()
            }}
            >
                {() => {
                    return (
                        <Form>
                            <FormControl>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <Flex>
                                    <InputGroup>
                                        <Input
                                        as={Field}
                                        name="name"
                                        type= "text"
                                        w={'80%'}
                                        variant='outline'
                                        colorScheme="purple"
                                        placeholder={name}
                                        />
                                    <ButtomTemp type="submit" content={'Update'} />
                                    </InputGroup>
                                </Flex>
                                <ErrorMessage
                                component='div'
                                name="name"
                                style={{color: 'red'}}
                                />
                            </FormControl>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}