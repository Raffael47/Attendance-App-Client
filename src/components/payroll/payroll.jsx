import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Error404 } from "../general/error404";
import { Stack, Table, Tr, Th, Icon, Td } from "@chakra-ui/react";
import { Pagination } from "../general/pagination";
import { useLocation, useParams } from "react-router-dom";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { convertToRp } from "../../helper/rupiah";
import { AcceptPayment } from "./acceptPayment";
import { SettlePayment } from "./settlePayment";

export const AllPayroll = () => {
    const token = localStorage.getItem('token')
    const { startDate, endDate, refresh } = useSelector((state) => state.recordSlice.value)
    const [ payroll, setPayroll ] = useState([])
    const [ data, setData ] = useState({});

    const [ sort, setSort ] = useState(true);
    const [ orderBy, setOrderBy ] = useState('');

    const location = useLocation();
    const currentPage = new URLSearchParams(location.search).get('page'); 

    const handlePayroll = async() => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/payrolls?startDate=${startDate}&endDate=${endDate}&sort=${sort? 'ASC' : 'DESC'}&orderBy=${orderBy}&limit=6&page=${currentPage}`, {
            headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setData(data)
            setPayroll(data.result)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handlePayroll();
    }, [refresh, orderBy, currentPage, sort]);

    const handleOrderBy = (value) => {
        setOrderBy(value)
        setSort(!sort)
    }
    return (
        <Stack gap='30px' mt={10}>
            {data?.status ? (
                <Table overflowX={'auto'} size={{base: '2xs', md: 'xs', lg: 'sm'}} color={'black'} variant={'striped'} justifyContent={'center'} alignItems={'center'}>
                <Tr bgColor={'cyan.800'} color={'black'} borderColor={'black'}>
                    <Th onClick={() => handleOrderBy('User.name')} justifyContent={'center'} border={'1px solid black'} >Employee Name { orderBy === 'User.name' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                    <Th onClick={() => handleOrderBy('User.email')} justifyContent={'center'} border={'1px solid black'} >Employee Email { orderBy === 'User.email' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                    <Th onClick={() => handleOrderBy('User.salary')} justifyContent={'center'} border={'1px solid black'} >Gross { orderBy === 'User.salary' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                    <Th onClick={() => handleOrderBy('date')} justifyContent={'center'} border={'1px solid black'} >Date { orderBy === 'date' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                    <Th onClick={() => handleOrderBy('tax')} justifyContent={'center'} border={'1px solid black'} >Tax 15% { orderBy === 'tax' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                    <Th onClick={() => handleOrderBy('deduction')} justifyContent={'center'} border={'1px solid black'} >Deduction { orderBy === 'deduction' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                    <Th onClick={() => handleOrderBy('net')} justifyContent={'center'} border={'1px solid black'} >Net Salary { orderBy === 'net' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                    <Th onClick={() => handleOrderBy('status')} justifyContent={'center'} border={'1px solid black'} >Status { orderBy === 'status' ? sort ? <Icon as={BiSolidDownArrow} color={'black'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'black'} w='3' h='3' /> : null }</Th>
                </Tr>
                    {payroll?.map(({ id, date, deduction, tax, net, status, User }, index) => (
                    <Tr key={index} border={'1px solid black'} >
                        <Td border={'1px solid black'} > {User?.name} </Td>
                        <Td border={'1px solid black'} > {User?.email} </Td>
                        <Td border={'1px solid black'} > {convertToRp(User?.salary)} </Td>
                        <Td border={'1px solid black'} > {date} </Td>
                        <Td border={'1px solid black'} > {convertToRp(tax)} </Td>
                        <Td border={'1px solid black'} > {convertToRp(deduction)} </Td>
                        <Td border={'1px solid black'} > {convertToRp(net)} </Td>
                        <Td border={'1px solid black'} > <SettlePayment status={status} id={id} name={User?.name} tax={tax} deduction={deduction} net={net} date={date} /> </Td>
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