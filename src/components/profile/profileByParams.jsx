import { Avatar, Stack, Text, Heading, Icon, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { convertToRp } from "../../helper/rupiah";

export const ProfileParams = () => {
    const [ profile, setProfile ] = useState([])
    const params = useParams();
    const token = localStorage.getItem('token');

    const handleProfile = async() => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/users?userId=${params.id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(data)
            setProfile(data.result[0])
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleProfile()
    }, [])
    const { id, name, email, isAdmin, imgProfile, salary, Shift } = profile;

    return (
        <Stack bgColor={'cyan.100'} w='100%' h='100%' gap={2} alignItems={'center'} >
            <Stack w='100%' h='100%' alignItems={'center'}>
                <Avatar mt={4} src={`http://localhost:8000/${imgProfile}`} size={'2xl'} />
                <Stack justifyContent={'center'} alignItems={'center'} gap={1}>
                    <Heading> {name} </Heading>
                    <Text color='gray.500' fontWeight={'light'}>ID: {id} </Text>
                    {isAdmin ? ( <Text fontWeight={'medium'} > Admin </Text> ) : ( <Text fontWeight={'medium'} > Employee </Text> ) }
                    <Flex alignItems={'center'} color={'gray.800'} gap={2} >
                        <Icon as={MdOutlineEmail} w='5' h='5' />
                        <Text> {email} </Text>
                    </Flex>
                </Stack>
                    <Flex mt={5} w='100%' justifyContent={'space-evenly'}>
                        <Stack>
                            <Text fontWeight={'medium'} > Salary </Text>
                            <Text > {convertToRp(salary)} </Text>
                        </Stack>
                        <Stack>
                            <Text fontWeight={'medium'} > Shift </Text>
                            <Text > {Shift?.shiftStart?.substring(0,5)}-{Shift?.shiftEnd?.substring(0,5)} </Text>
                        </Stack>
                    </Flex>
            </Stack>
        </Stack>
    )
}