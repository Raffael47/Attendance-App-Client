import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, useToast, Input,
    Select, useDisclosure, FormControl, FormLabel, Icon, Button, InputGroup, Stack
  } from '@chakra-ui/react'
import { ButtomTemp } from '../general/button'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlinePlus } from "react-icons/ai";

  export const AddUser = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show, setShow] = useState(false)
    const toast = useToast();
    const [ schedule, setSchedule ] = useState([]);

    const handlePassword = () => setShow(!show)
    const token = localStorage.getItem('token');

    const registerSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").matches(/^[A-Za-z .,']+$/, "Name must not have numbers or symbols"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string()
            .min(8, "Your password needs to be at least 8 characters long")
            .matches(/[a-z]+/, "Password no lowercase")
            .matches(/[A-Z]+/, "Password no uppercase")
            .matches(/[!@#$%^&*()-+]+/, "Password needs to have at least 1 special character")
            .required("Password is required"),
        salary: Yup.string().required("Salary is required"),
        ShiftId: Yup.number().required('Shift schedule is required')
    })

    const handleAddUser = async(value) => {
        try {
            await axios.post('http://localhost:8000/api/auth', value, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            toast({
                status: 'success',
                title: 'User Added',
                duration: 1500,
                isClosable: true
            });
        } catch (err) {
            console.log(err);
            toast({
                status: 'error',
                title: 'Add User Failed',
                duration: 1500,
                isClosable: true
            });
        }
    };

    const handleShift = async() => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/users/shift', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setSchedule(data.result);
        } catch (err) {
            toast({
                status: 'error',
                title: 'Failed to Get Shift Schedule',
                duration: 1500,
                isClosable: true
            });
        }
    }

    useEffect(() => {
        handleShift();
    }, []);

    return (
        <>
        <ButtomTemp func={onOpen} content={<Icon as={AiOutlinePlus} w='5' h='5' />} />

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader> Add User </ModalHeader>
            <ModalCloseButton />

            <Formik
            initialValues={{ name: '', email: '', password: '', salary: 0, ShiftId: 0 }}
            validationSchema={registerSchema}
            onSubmit={(value) => {
                handleAddUser(value)
            }}
            >
                {() => {
                    return (
                        <>
                        <Form>
                        <ModalBody>
                            <FormControl id="name">
                                <FormLabel>Name</FormLabel>
                                <Input as={Field} name='name' type="text" />
                                <ErrorMessage name='name' component={'div'} style={{ color: 'red' }} />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input as={Field} name='email' type="email" />
                                <ErrorMessage name='email' component={'div'} style={{ color: 'red' }} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input as={Field} name='password' type={show ? 'text' : 'password'} />
                                    <Button type='button' onClick={handlePassword}> {show ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />} </Button>
                                </InputGroup>
                                <ErrorMessage name='password' component={'div'} style={{ color: 'red' }} />
                            </FormControl>
                            <FormControl id="ShiftId">
                                <FormLabel>Shift Schedule</FormLabel>
                                <Field as={Select} name='ShiftId' w='100%' >
                                    {schedule.map(({id, shiftStart, shiftEnd}, idx) => {
                                        return (
                                            <option key={idx} value={id}> 
                                                {id}) {shiftStart}-{shiftEnd} 
                                            </option>
                                        )
                                    })}
                                </Field>
                                <ErrorMessage name='ShiftId' component={'div'} style={{ color: 'red' }} />
                            </FormControl>
                            <FormControl id="salary">
                                <FormLabel>Salary</FormLabel>
                                <Input as={Field} name='salary' type="number" />
                                <ErrorMessage name='salary' component={'div'} style={{ color: 'red' }} />
                            </FormControl>
                            
                            <Stack spacing={10}></Stack>
                        </ModalBody>
                        <ModalFooter gap={3}>
                            <ButtomTemp colorScheme='cyan' content={'Register'} type='submit'  />
                            <ButtomTemp colorScheme='pink' func={onClose} content={'Cancel'} />
                        </ModalFooter>
                        </Form>
                        </>
                    )
                }}
            </Formik>
            </ModalContent>
        </Modal>
        </>
    )
  }