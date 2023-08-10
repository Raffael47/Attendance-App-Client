import { Flex, FormLabel, Input, useToast, FormControl, InputGroup } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { ButtomTemp } from "../general/button";

export const ChangeBirthdate = () => {
    
    const token = localStorage.getItem("token");

    const { birthdate } = useSelector(state => state.userSlice.value)

    const birthdateSchema = Yup.object().shape({
        birthdate: Yup.string()
        .required("Birthdate is required")
    })

    const toast = useToast()

    const handleBirthdate = async(value) => {
        try {
            await axios.patch("http://localhost:8000/api/users/birthdate", value, {
                headers: {
                    authorization:`Bearer ${token}`
                }
            })
            toast({
                title:'Birthdate Updated',
                status: 'success',
                isClosable: true,
                duration: 1500
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
            toast({
                title: `birthdate Update Failed`,
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
            initialValues={{ birthdate: '' }}
            validationSchema={birthdateSchema}
            onSubmit= {(value, action) => {
                handleBirthdate(value)
            }}
            >
                {() => {
                    return (
                        <Form>
                            <FormControl>
                                <FormLabel>
                                    Birthdate
                                </FormLabel>
                                <Flex>
                                    <InputGroup>
                                        <Input
                                        as={Field}
                                        birthdate="birthdate"
                                        w={'80%'}
                                        variant='outline'
                                        colorScheme="purple"
                                        placeholder={birthdate}
                                        type="datetime-local"
                                        />
                                    <ButtomTemp type="submit" content={'Update'} />
                                    </InputGroup>
                                </Flex>
                                <ErrorMessage
                                component='div'
                                birthdate="birthdate"
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