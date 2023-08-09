import { Flex, Icon, Text } from "@chakra-ui/react"
import { ButtomTemp } from "./button"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

export const Pagination = ({ totalPage }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = Number(queryParams.get('page')) || 1;

    function handlePageChange(newPage) {
        if (currentPage <= totalPage) queryParams.set('page', newPage)
        navigate({ search: queryParams.toString() });
    }
    return (
        <Flex gap={3} alignItems={'center'} justifyContent={'center'}>
            <ButtomTemp 
            isDisabled= {currentPage === 1 ? true : false}
            content={ <Icon as={FaArrowAltCircleLeft} w='5' h='5' /> } 
            func={() => handlePageChange(currentPage - 1)}
            />
            <Text fontWeight={'medium'} color={'pink.900'}> Page {currentPage} of {totalPage} </Text>
            <ButtomTemp 
            isDisabled= {currentPage === totalPage ? true : false}
            content={ <Icon as={FaArrowAltCircleRight} w='5' h='5' /> } 
            func={() => handlePageChange(currentPage + 1)}
            />
        </Flex>
    )
}