import axios from "axios";
import { ButtomTemp } from "../general/button"
import { changeClockState } from "../../redux/clockSlice";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

export const ClockOut = () => {
    const token = localStorage.getItem('token');
    const toast = useToast();
    const dispatch = useDispatch();
    const { Shift } = useSelector((state) => state.userSlice.value);

    const handleClockOut = async() => {
        try {
            await axios.patch('http://localhost:8000/api/attendances', {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            toast({
                status: 'success',
                title: 'Clock Out Succeed',
                description: 'Thanks you for your hardwork!',
                duration: 1500,
                isClosable: true
            });
            dispatch(changeClockState({ clockedIn: false }))

        } catch (err) {
            console.log(err);
            toast({
                status: 'error',
                title: 'Clock Out Failed',
                description: 'Please try again late',
                duration: 1500,
                isClosable: true
            });
        }
    }

    const hour = new Date(Date.now()).getHours()
    const endHour = Shift?.shiftEnd?.split(':')[0]

    return (
        <ButtomTemp isDisabled={ (hour >= +endHour + 2 ) ? false : true } colorScheme={'pink'} content={'Clock Out'} func={handleClockOut} width={'100%'} />
    )
}