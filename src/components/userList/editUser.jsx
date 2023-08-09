import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, useToast, Input,
    Select, useDisclosure, FormControl, FormLabel, Icon, Button, InputGroup, Stack, Text, Flex
  } from '@chakra-ui/react'
import { ButtomTemp } from '../general/button'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";

  export const EditUser = ({ userId, name }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [ schedule, setSchedule ] = useState([]);
    const token = localStorage.getItem('token');

    const editUserSchema = Yup.object().shape({
        salary: Yup.string().required("Salary is required"),
        ShiftId: Yup.number().required('Shift schedule is required')
    })

    const handleEditUser = async(value) => {
        try {
            value.id = userId
            await axios.patch('http://localhost:8000/api/users/salary', value, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            toast({
                status: 'success',
                title: 'User Updated',
                duration: 1500,
                isClosable: true
            });
        } catch (err) {
            console.log(err);
            toast({
                status: 'error',
                title: 'Update User Failed',
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
        <Button zIndex={10} borderRadius={'3xl'} onClick={onOpen} color={'gray.500'} bgColor={'cyan.50'}><Icon as={BsThreeDotsVertical} w='5' h='5' /></Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader> Edit User </ModalHeader>
            <ModalCloseButton />

            <Formik
            initialValues={{ salary: 0, ShiftId: 0 }}
            validationSchema={editUserSchema}
            onSubmit={(value) => {
                handleEditUser(value)
            }}
            >
                {() => {
                    return (
                        <>
                        <Form>
                        <ModalBody>
                            <Flex mb='3' w='100%' justifyContent={'space-between'} alignItems={'center'}>
                                <Stack gap={2}>
                                    <Text fontWeight={'medium'}>Employee Name</Text>
                                    <Text color={'gray.500'} > {name} </Text>
                                </Stack>
                                <Stack gap={2}>
                                    <Text fontWeight={'medium'}>Employee ID</Text>
                                    <Text color={'gray.500'} > {userId} </Text>
                                </Stack>
                            </Flex>
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
                            <ButtomTemp colorScheme='cyan' content={'Update'} type='submit'  />
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