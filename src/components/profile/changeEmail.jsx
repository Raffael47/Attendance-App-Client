import { Button, Flex, FormLabel, Input, useToast, FormControl, InputGroup, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { ButtomTemp } from "../general/button";

export const ChangeEmail = () => {
    
    const token = localStorage.getItem("token");

    const { email } = useSelector(state => state.userSlice.value)

    const emailSchema = Yup.object().shape({
        email: Yup.string()
        .email("Invalid email format")
        .required("Email is required")
    })

    const toast = useToast()

    const handleEmail = async(value) => {
        try {
            await axios.patch("http://localhost:8000/api/users/email", value, {
                headers: {
                    authorization:`Bearer ${token}`
                }
            })
            toast({
                title:'Email changed succesful',
                status: 'success',
                isClosable: true
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
            toast({
                title: `Email has already been used`,
                status: 'error',
                isClosable: true
            })
        }
    }

    return (
        <>
            <Formik
            initialValues={{ email: '' }}
            validationSchema={emailSchema}
            onSubmit= {(value, action) => {
                handleEmail(value)
                action.resetForm()
            }}
            >
                {() => {
                    return (
                        <Form>
                            <FormControl>
                                <FormLabel>
                                    Email Address
                                </FormLabel>
                                <Flex>
                                    <InputGroup>
                                        <Input
                                        as={Field}
                                        name="email"
                                        type= "email"
                                        w={'80%'}
                                        variant='outline'
                                        colorScheme="purple"
                                        placeholder={email}
                                        />
                                    <ButtomTemp type="submit" content={'Update'} />
                                    </InputGroup>
                                </Flex>
                                <ErrorMessage
                                component='div'
                                name="email"
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