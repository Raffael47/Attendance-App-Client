import { Flex, Grid, GridItem, Heading, Icon, Select, Stack, Text, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { UserCard } from "./userCard";
import { Pagination } from "../general/pagination";
import { BsCircleFill } from "react-icons/bs";
import { AddUser } from "./addUser";
import { useLocation } from "react-router-dom";

export const UserList = () => {
    const [ userInfo, setUserInfo ] = useState([]);
    const token = localStorage.getItem('token');
    const [ totalPage, setTotalPage ] = useState(0);
    const [ totalEmployees, setTotalEmployees ] = useState(0);
    const location = useLocation();
    const currentPage = new URLSearchParams(location.search).get('page');
    const [ schedule, setSchedule ] = useState([]);
    const shiftRef = useRef();
    const toast = useToast();

    const handleCards = async() => {
        try {
            const shiftId = shiftRef.current.value;
            const { data } = await axios.get(`http://localhost:8000/api/users?limit=8&page=${currentPage}&shiftId=${shiftId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setUserInfo(data.result);
            setTotalPage(data.totalPage);
            setTotalEmployees(data.total);
        } catch (err) {
            console.log(err);
        }
    }

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

    useEffect(() => {
        handleCards()
    }, [currentPage, shiftRef.current])
    return (
        <Stack gap={5} p='5' justifySelf={'center'} alignSelf={'center'} w='100%' h='100%'>
            <Flex w='100%' justifyContent={'space-between'} alignItems={'center'} >
                <Heading color={'pink.900'} > {totalEmployees} Employees </Heading>
                <Flex gap={10}>
                    <Select
                    name='shiftId'
                    placeholder="Shift Schedule"
                    defaultValue=''
                    ref={shiftRef}
                    borderRadius='10px'
                    _hover={{borderColor:'cyan.500'}}
                    border='1px solid black'>
                        {schedule.map(({id, shiftStart, shiftEnd}, idx) => {
                            return (
                                <option key={idx} value={id}> 
                                    {id}) {shiftStart}-{shiftEnd} 
                                </option>
                            )
                        })}
                    </Select>
                    <Flex alignItems={'center'} gap={2}>
                        <Icon as={BsCircleFill} w='5' h='5' color={'green'} />
                        <Text fontWeight={'semibold'} color={'gray.800'}> On Time </Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={2}>
                        <Icon as={BsCircleFill} w='5' h='5' color={'red'} />
                        <Text fontWeight={'semibold'} color={'gray.800'}> Late </Text>
                    </Flex>
                    <AddUser/>
                </Flex>
            </Flex>
            <Grid gap={6} w='100%' h='100%' templateRows={{ base: 'repeat(8, 1fr)', sm: 'repeat(4, 1fr)' , lg: 'repeat(2, 1fr)' }} templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} >
                {userInfo.map(({ id, name, imgProfile, Shift, email, ShiftId, salary }) => {
                    return (
                        <GridItem colSpan={1} rowSpan={1}>
                            <UserCard id={id} email={email} name={name} imgProfile={imgProfile} shiftStart={Shift?.shiftStart} ShiftId={ShiftId} salary={salary}/>
                        </GridItem>
                    )
                })}
            </Grid>
            <Pagination totalPage={totalPage} />
        </Stack>
    )
}