import { Input, Flex, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleEnd, handleStart } from "../../redux/recordSlice";

export const TimeRange = () => {
    const dispatch = useDispatch();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = new URLSearchParams(location.search);

    const resetPage = () => {
        currentPath.set('page', 1);
        navigate({search: currentPath.toString()});
    }

    const handleStartDate = () => {
        dispatch(handleStart({startDate: startDateRef.current.value}));
        resetPage();
    }

    const handleEndDate = () => {
        dispatch(handleEnd({endDate: endDateRef.current.value}));
        resetPage();
    }
    return (
        <Flex wrap={{base: 'wrap', md: 'nowrap'}} gap={3} color={'purple'} justifyContent={{base: 'center', md: 'end'}} alignItems={'center'}>
            <Input border={'1px solid purple'} onChange={handleStartDate} type="datetime-local" size={'lg'} ref={startDateRef} />
            <Text fontWeight={'bold'} color={'purple'} >to</Text>
            <Input border={'1px solid purple'} onChange={handleEndDate} type="datetime-local" size={'lg'} ref={endDateRef} />
        </Flex>
    )
}