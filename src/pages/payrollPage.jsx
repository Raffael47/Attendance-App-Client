import { Grid, GridItem } from '@chakra-ui/react'
import { Navbar } from '../components/general/navbar'
import { UserPayroll } from '../components/payroll/userPayroll'
import { useSelector } from 'react-redux'
import { AllPayroll } from '../components/payroll/payroll'
import { TimeRange } from '../components/general/timeRange'

export const PayrollPage = () => {
    const { isAdmin } = useSelector((state) => state.userSlice.value);
    return (
    <Grid templateRows={'1fr 7fr'} bgColor='' w='100%' h='100%' overflowX={'hidden'}>
    <GridItem bgColor={'purple.500'} rowSpan={1} w='100%' h={'100%'}>
        <Navbar heading={'Payroll'}/>
    </GridItem>
    <GridItem p={5} rowSpan={1} w='100%' h={'100%'}>
        <TimeRange/>
        {isAdmin ? (
            <AllPayroll/>
        ): (
            <UserPayroll/>
        )}
    </GridItem>
    </Grid>
    )
}