import axios from "axios";
import { ButtomTemp } from "../general/button"
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { changeClockState } from "../../redux/clockSlice";
import { useEffect, useState } from "react";

export const ClockIn = () => {
    const token = localStorage.getItem('token');
    const toast = useToast();
    const dispatch = useDispatch();
    const { Shift } = useSelector((state) => state.userSlice.value);

    const handleClockIn = async() => {
        try {
            await axios.post('http://localhost:8000/api/attendances', {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            toast({
                status: 'success',
                title: 'Clock In Succeed',
                description: 'Happy working!',
                duration: 1500,
                isClosable: true
            });
            dispatch(changeClockState({ clockedIn: true }))

        } catch (err) {
            console.log(err);
            toast({
                status: 'error',
                title: 'Clock In Failed',
                description: 'Please try again late',
                duration: 1500,
                isClosable: true
            });
        }
    }

    const handleLate = async() => {
        try {
            await axios.patch('http://localhost:8000/api/payrolls/late', {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            toast({
                status: 'error',
                title: "You're late",
                description: 'Your salary will be deducted',
                isClosable: true
            })
        } catch (err) {
            console.log(err);
        }
    }

    const hour = new Date(Date.now()).getHours()
    const day = new Date(Date.now()).getDate()
    const month = new Date(Date.now()).getMonth()
    const year = new Date(Date.now()).getFullYear()
    const startHour = Shift?.shiftStart?.split(':')[0]

    const today = new Date (year, month, day, startHour).getTime()
    const currentTime = new Date(Date.now()).getTime()

    const handleClick = () => {
        handleClockIn()
        if ( today - currentTime < 0 ) {
            handleLate();
        }
    }
    
    return (
        <ButtomTemp isDisabled={ (hour >= +startHour + 2 && hour <= startHour - 1) ? false : true } colorScheme={'cyan'} content={'Clock in'} func={handleClick} width={'100%'} />
    )
}