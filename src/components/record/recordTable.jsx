import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Error404 } from "../general/error404";
import { Stack, Table, Tr, Th, Icon, Td } from "@chakra-ui/react";
import { Pagination } from "../general/pagination";
import { useLocation, useParams } from "react-router-dom";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

export const RecordTable = () => {
    const { id } = useSelector((state) => state.userSlice.value);
    const params = useParams();
    const [ record, setRecord ] = useState([])
    const token = localStorage.getItem('token')
    const { startDate, endDate, refresh } = useSelector((state) => state.recordSlice.value)
    const [ userInfo, setUserInfo ] = useState({})

    const [ data, setData ] = useState({});

    const [ sort, setSort ] = useState(true);
    const [ orderBy, setOrderBy ] = useState('');

    const location = useLocation();
    const currentPage = new URLSearchParams(location.search).get('page'); 

    const handleRecord = async() => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/attendances?startDate=${startDate}&endDate=${endDate}&orderBy=${orderBy}&userId=${params.id}&sort=${sort ? 'ASC' : 'DESC'}&limit=6&page=${currentPage}`, {
            headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setData(data)
            setRecord(data.result)
            setUserInfo(data.userInfo)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRecord();
    }, [refresh, orderBy, currentPage, sort]);

    const handleOrderBy = (value) => {
        setOrderBy(value)
        setSort(!sort)
    }
    const { Shift } = userInfo
    return (
        <Stack gap='30px' mt={10}>
            {data?.status ? (
                <Table overflowX={'auto'} size={{base: 'sm', md: 'md', lg: 'lg'}} color={'black'} variant={'striped'} justifyContent={'center'} alignItems={'center'}>
                <Tr bgColor={'cyan.800'} color={'black'} borderColor={'black'}>
                    <Th w={'6'} onClick={() => handleOrderBy('id')} justifyContent={'center'} border={'1px solid black'} ># { orderBy === 'id' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null } </Th>
                    <Th onClick={() => handleOrderBy('date')} justifyContent={'center'} border={'1px solid black'} >Date { orderBy === 'date' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                    <Th onClick={() => handleOrderBy('clockIn')} justifyContent={'center'} border={'1px solid black'} >Clock In { orderBy === 'clockIn' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                    <Th onClick={() => handleOrderBy('clockOut')} justifyContent={'center'} border={'1px solid black'} >Clock Out { orderBy === 'clockOut' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                    <Th onClick={() => handleOrderBy('onTime')} justifyContent={'center'} border={'1px solid black'} >Status { orderBy === 'onTime' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                </Tr>
                    {record?.map(({ id, clockIn, clockOut, date, onTime }, index) => (
                    <Tr key={index} border={'1px solid black'} >
                        <Td border={'1px solid black'} > {id} </Td>
                        <Td border={'1px solid black'} > {date} </Td>
                        <Td border={'1px solid black'} > {clockIn} </Td>
                        <Td border={'1px solid black'} > {clockOut} </Td>
                        {onTime ? (<Td fontWeight={'medium'} color={'green'} border={'1px solid black'} > ON TIME </Td>) : (<Td fontWeight={'medium'} color={'red'} border={'1px solid black'} > LATE </Td>)}
                    </Tr>
                    ))} 
            </Table>
                
            ) : (
                <Error404/>
            )}

            {data?.status ? (
                <Pagination totalPage={data?.totalPage} />
            ) : null }

        </Stack>
      );
}