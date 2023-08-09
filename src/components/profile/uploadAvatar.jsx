import { Button, Input, Stack, InputGroup, useToast, Heading } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { ButtomTemp } from "../general/button";

export const ChangeAvatar = () => {

    const token = localStorage.getItem("token")

    const avatarSchema = Yup.object().shape({
        file: Yup.mixed()
        .required("Image is required")
        .test(
            "fileSize",
            "File too large",
            (value) => value === null || (value && value.size <= 10000000)
        )
    })

    const toast = useToast()

    const handleProfilePic = async(value) => {
        try {
            const { file } = value;
            const data = new FormData();
            data.append("file", file)
            console.log(data)

            await axios.post("http://localhost:8000/api/users", data, {
                headers: {
                    authorization:`Bearer ${token}`
                },
                "Content-type": "multipart/form-data"
            })
            toast({
                title: `Avatar updated`,
                status: 'success',
                isClosable: true
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
            toast({
                title: `Failed to update your avatar`,
                status: 'error',
                isClosable: true
            })
        }
    }

    return (
        <Stack
        justifyContent={'center'}
        gap={2}
        >
            <Heading size={'lg'} color={'pink.900'}>
                Change Profile Pic
            </Heading>
            <Formik
            initialValues={{file: ""}}
            validationScheme={avatarSchema}
            onSubmit={(value) => {
                handleProfilePic(value)
            }}
            >
                {({setFieldValue}) => {
                    return (
                        <Form>
                            <InputGroup
                            >
                                <Input
                                variant="flushed"
                                type="file"
                                name="file"
                                placeholder="Choose file"
                                textAlign={'center'}
                                onChange={(e) => {
                                setFieldValue("file", e.target.files[0]);
                                }}
                                />
                                <ButtomTemp type="submit" content={'Save'} /> 
                                <ErrorMessage
                                component='div'
                                name="file"
                                style={{ color: "red", fontSize: "15px", marginTop: 0 }}
                                />
                            </InputGroup>
                        </Form>
                    )
                }}
            </Formik>
        </Stack>
    )
}