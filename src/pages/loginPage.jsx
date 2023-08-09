'use client'

import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Icon, Heading, Text, useColorModeValue, useToast, InputGroup } from '@chakra-ui/react'
import axios from 'axios';
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { login } from '../redux/userSlice';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export const LoginPage = () => {
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ show, setShow ] = useState(false);

    const handlePassword = () => setShow(!show);

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Your password needs to be at least 8 characters long")
            .matches(/[a-z]+/, "Password requires at least 1 lowercase")
            .matches(/[A-Z]+/, "Password requires at least 1 uppercase")
            .matches(/[!@#$%^&*()-+]+/, "Password needs to have at least 1 special character")
            .required("Password is required")
    });

    const handleLogin = async(value) => {
        try {
            const { data } = await axios.post('http://localhost:8000/api/auth/login', value);
            localStorage.setItem( 'token', data.token );
            const { name, email, imgProfile, isAdmin, ShiftId, salary } = data.result;
            const { shiftStart, shiftEnd } = ShiftId;
            dispatch( login( { name, email, imgProfile, isAdmin, shiftStart, shiftEnd, salary } ) );

            toast({
                status: 'success',
                title: 'Log in Succesful',
                duration: 1500,
                isClosable: true
            });

            navigate('/')

        } catch (err) {
            console.log(err);
            toast({
                status: 'error',
                title: 'Log in Failed',
                description: 'Please try again later',
                duration: 1500,
                isClosable: true
            });
        }
    }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={ loginSchema }
            onSubmit={(value, action) => {
                handleLogin(value)
            }}
            >
                {() => {
                    return (
                        <Form>
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
                            <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'end'}>
                                <Text as={Link} to={'/forgot-password'} color={'purple.400'}>Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={'purple.400'}
                                color={'white'}
                                type='submit'
                                _hover={{
                                bg: 'purple.500'
                                }}>
                                Log in
                            </Button>
                            </Stack>
                        </Form>
                    )
                }}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}