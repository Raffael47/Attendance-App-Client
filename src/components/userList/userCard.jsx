import { Avatar, Box, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { BsCircleFill } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { EditUser } from "./editUser";
import { convertToRp } from "../../helper/rupiah";

export const UserCard = ({ imgProfile, name, id, shiftStart, ShiftId, email, salary }) => {
    const navigate = useNavigate();
    const [ record, setRecord ] = useState([]);
    const token = localStorage.getItem('token');

    const handleUserRecord = async() => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/attendances?userId=${id}&limit=4`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setRecord(data.result);
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        handleUserRecord()
    }, [])
    
    return (
        <Stack
        w='100%'
        h='100%'
        boxShadow={'dark-lg'}
        alignItems={'center'}
        borderRadius={'10px'}
        border={'3px double cyan'}
        gap={2}
        p={4}
        >
            <Flex w='100%' alignItems={'center'} justifyContent={'space-between'}>
                <Text fontWeight={'medium'} color={'gray.500'}> Shift {ShiftId} </Text>
                <EditUser userId={id} name={name} />
            </Flex>
            <Stack
            alignItems={'center'}
            onClick={() => navigate(`/record/${id}`)}
            gap={2}
            >
                <Avatar size='xl' src={`http://localhost:8000/${imgProfile}`} />
                <Heading fontSize={'2xl'} >
                    {name}
                </Heading>
                <Flex alignItems={'center'} color={'gray.800'} gap={2} >
                    <Icon as={MdOutlineEmail} w='5' h='5' />
                    <Text> {email} </Text>
                </Flex>
                <Text fontSize={'sm'} color={'gray.500'}> Salary: {convertToRp(salary)} </Text>

                <Stack w='60%' gap={2}>
                    <Text color={'gray.500'} >
                        Recent 
                    </Text>
                    <Flex w='100%' justifyContent={'space-between'}>
                        {record.map(({ clockIn }) => {
                            return (
                                <Icon 
                                as={BsCircleFill} 
                                color={ shiftStart >= clockIn ? 'green' : 'red' } 
                                w='5'
                                h='5'
                                />
                            )
                        })}
                    </Flex>
                </Stack>
            </Stack>
        </Stack>
    )
}