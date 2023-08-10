import { Select, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShiftId } from "../../redux/shiftSlice";

export const FilterShift = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const [ schedule, setSchedule ] = useState([]);
    const shiftRef = useRef();
    const toast = useToast();
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const currentPath = new URLSearchParams(location.search);

    const resetPage = () => {
        currentPath.set('page', 1);
        navigate({search: currentPath.toString()});
    }

    const handleChangeShift = () => {
        dispatch(setShiftId({ ShiftId: shiftRef.current.value }));
        resetPage();
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

    return (
        <Select
        name='shiftId'
        placeholder="Shift Schedule"
        defaultValue=''
        ref={shiftRef}
        onChange={handleChangeShift}
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
    )
}