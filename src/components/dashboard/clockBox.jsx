import { Flex, Box, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { LiveClock } from './clock'
import { ClockIn } from './clockIn'
import { ClockOut } from './clockOut'
import { sortDate } from '../../helper/date'
import { useSelector } from 'react-redux'

export const ClockBox = () => {
    const { clockedIn } = useSelector((state) => state.clockSlice.value);
    const { Shift } = useSelector((state) => state.userSlice.value)

    return (
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Box
            rounded={'lg'}
            boxShadow={'dark-lg'}
            border={'3px double cyan'}
            p={8}>
            <Stack alignItems={'center'} spacing={4}>
            <LiveClock />
            <Stack gap={1}>
                {clockedIn ? (
                <Text color={'green'} fontSize={'lg'} fontWeight={'bold'} >
                    CLOCKED IN
                </Text>
                ) : (
                <Text color={'red'} fontSize={'xl'} fontWeight={'bold'} >
                    CLOCKED OUT
                </Text>

                )}
                <Text fontSize={';g'} fontWeight={'semibold'} >
                    { sortDate(Date.now()) }
                </Text>
                <Text fontSize={'md'} color={'gray.500'} fontWeight={'normal'} >
                    SCHEDULE
                </Text>
                <Text fontSize={'md'} color={'gray.500'} fontWeight={'normal'} >
                    {Shift?.shiftStart} - {Shift?.shiftEnd}
                </Text>
            </Stack>
                <ClockIn/>
                <ClockOut/>
            </Stack>
            </Box>
        </Stack>
    )
}