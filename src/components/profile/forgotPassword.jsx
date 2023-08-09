import { Heading, Stack, Icon, Input, useToast } from "@chakra-ui/react"
import { GoMail } from "react-icons/go";
import axios from "axios"
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { ButtomTemp } from "../general/button";

export const ForgotPassword = ()  => {

    const toast = useToast()

    const handleSubmit = async(value) => {
        try {
            console.log(value)
            await axios.put("http://localhost:8000/api/auth", value)
            toast({
                title:'Check your email to verify',
                status: 'info',
                isClosable: true
            })
        } catch (error) {
            console.log(error)
            toast({
                title:'Failed to send email',
                description: 'Please recheck your email input.',
                status: 'error',
                isClosable: true
            })
        }
    }

    const emailSchema = Yup.object().shape({
        email: Yup.string()
        .email("Invalid email format")
        .required("Email is required")
    })

    return (
        <Stack
        boxShadow={'dark-lg'}
        borderRadius='10px'
        color='black'
        padding='1rem'
        alignItems='center'
        justifyContent='center'
        >
            <Heading>
                Reset Password
            </Heading>

            <Icon
            as={GoMail}
            w='5rem'
            h='5rem'
            />

            <Formik
            initialValues={{email: ""}}
            validationSchema={emailSchema}
            onSubmit={(value, action) => {
                handleSubmit(value)
            }}
            >
                {() => {
                    return (
                        <Form>
                            <Stack
                            w='100%'
                            >
                                <Input
                                name="email"
                                type="email"
                                as={Field}
                                w='100%'
                                placeholder="Enter your email"
                                />
                                <ErrorMessage
                                component='div'
                                name='email'
                                style={{color: 'red'}}
                                />

                                <ButtomTemp type="submit" content={'Send Link'} />
                            </Stack>
                        </Form>
                    )
                }}
            </Formik>

        </Stack>
    )
}