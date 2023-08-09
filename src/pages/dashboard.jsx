import { Grid, GridItem } from '@chakra-ui/react'
import { ClockBox } from '../components/dashboard/clockBox'
import { Navbar } from '../components/general/navbar'

export const Dashboard = () => {
    return (
    <Grid templateRows={'1fr 7fr'} bgColor='' w='100%' h='100%' overflowX={'hidden'}>
    <GridItem bgColor={'purple.500'} rowSpan={1} w='100%' h={'100%'}>
        <Navbar heading={'Dashboard'}/>
    </GridItem>
    <GridItem rowSpan={1} w='100%' h={'100%'}>
        <ClockBox/>
    </GridItem>
    </Grid>
    )
}