import { Grid, GridItem, Stack } from '@chakra-ui/react'
import { RecordTable } from '../components/record/recordTable'
import { Navbar } from '../components/general/navbar'
import { TimeRange } from '../components/general/timeRange'
import { ProfileParams } from '../components/profile/profileByParams'
import { useSelector } from 'react-redux'
import { Profile } from '../components/profile/profile'

export const RecordPage = () => {
    const { isAdmin } = useSelector((state) => state.userSlice.value);

    return (
    <Grid templateRows={'1fr 7fr'} templateColumns={'3fr 8fr'} bgColor='' w='100%' h='100%' overflowX={'hidden'}>
    <GridItem bgColor={'purple.500'} colSpan={2} rowSpan={1} w='100%' h={'100%'}>
        <Navbar heading={'Attendance Log'} />
    </GridItem>
    <GridItem bgColor={'red'} rowSpan={1} colSpan={{ base: 2, lg: 1 }} w='100%' h={'100%'}>
        {isAdmin ? (<ProfileParams/>) : (<Profile/>)}
    </GridItem>
    <GridItem p={6} rowSpan={1} colSpan={{ base: 2, lg: 1 }} w='100%' h={'100%'}>
        <Stack gap='1'>
            <TimeRange/>
            <RecordTable />
        </Stack>
    </GridItem>
    </Grid>
    )
}