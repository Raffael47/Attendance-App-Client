import { Button, ButtonGroup, Flex, FormLabel, Heading, Icon, Input, InputGroup, Stack, useToast } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { ButtomTemp } from "../general/button";

export const ChangePassword = () => {

    const token = localStorage.getItem("token")

    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [confirmShow, setConfirmShow] = useState(false)

    const handleShowCurrentPassword = () => setShowOld(!showOld)
    const handleShowNewPassword = () => setShowNew(!showNew)
    const handleConfirmShowPassword = () => setConfirmShow(!confirmShow)

    const passwordSchema = Yup.object().shape({
        currentPassword: Yup.string()
        .min(8, "Your password needs to have at least 8 characters")
        .matches(/[a-z]+/, "Password no lowercase")
        .matches(/[A-Z]+/, "Password no uppercase")
        .matches(/[!@#$%^&*()-+]+/, "Password needs to have at least 1 special character")
        .required("Password is required"),
        password: Yup.string()
        .min(8, "Your password needs to have at least 8 characters")
        .matches(/[a-z]+/, "Password no lowercase")
        .matches(/[A-Z]+/, "Password no uppercase")
        .matches(/[!@#$%^&*()-+]+/, "Password needs to have at least 1 special character")
        .required("Password is required"),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required()
    })

    const toast = useToast()

    const handleSubmit = async(value) => {
        try {
            await axios.patch("http://localhost:8000/api/users/password", value , {
                headers: {
                    authorization:`Bearer ${token}`
                }
            })
            toast({
                title:'Password Updated',
                status: 'success',
                isClosable: true,
                duration: 1500
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
            toast({
                title:'Password incorrect',
                description: 'Please try again',
                status: 'error',
                isClosable: true,
                duration: 2000
            });
        }
    }

    

    return (
        <Stack
        w='100%'
        justifyContent='center'
        gap='3'
        >
                <Heading size={'lg'} color={'pink.900'}>
                    Change Password
                </Heading>

                <Formik
                initialValues={{currentPassword:"", password: "", confirmPassword:""}}
                validationSchema={passwordSchema}
                onSubmit= {(value, action) => {
                    handleSubmit(value)
                }}
                >
                    {() => {
                        return (
                            <Form>
                                <Stack
                                w='100%'
                                >
                                    <FormLabel
                                    fontSize='md'
                                    htmlFor="currentPassword"
                                    >
                                        Current Password
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                        as={Field}
                                        name="currentPassword"
                                        type= {showOld ? "text" : "password"}
                                        w='100%'
                                        />
                                        <Button
                                        onClick={handleShowCurrentPassword}
                                        >
                                            {showOld ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />}
                                        </Button>
                                    </InputGroup>
                                    <ErrorMessage
                                    component='div'
                                    name="currentPassword"
                                    style={{color: 'red'}}
                                    />

                                    <FormLabel
                                    fontSize='md'
                                    htmlFor="password"
                                    >
                                        New Password
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                        as={Field}
                                        name="password"
                                        type= {showNew ? "text" : "password"}
                                        w='100%'
                                        />
                                        <Button
                                        onClick={handleShowNewPassword}
                                        >
                                            {showNew ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />}
                                        </Button>
                                    </InputGroup>
                                    <ErrorMessage
                                    component='div'
                                    name="password"
                                    style={{color: 'red'}}
                                    />

                                    <FormLabel
                                    fontSize='md'
                                    htmlFor="confirmPassword"
                                    >
                                        Confirm Password
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                        as={Field}
                                        name="confirmPassword"
                                        type= {confirmShow ? "text" : "password"}
                                        w='100%'
                                        />
                                        <Button
                                        onClick={handleConfirmShowPassword}
                                        >
                                            {confirmShow ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />}
                                        </Button>
                                    </InputGroup>
                                    <ErrorMessage
                                    component='div'
                                    name="confirmPassword"
                                    style={{color: 'red'}}
                                    />

                                    <ButtomTemp width={'100%'} content={'Change Password'} type='submit' />
                                </Stack>
                            </Form>
                        )
                    }}
                </Formik>
            </Stack>
    )
}