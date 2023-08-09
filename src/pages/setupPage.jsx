import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/general/sidebar'

export const SetupPage = () => {
    return (
    <Grid templateColumns={'repeat(13, 1fr)'} w='100vw' h='100vh' overflowX={'hidden'}>
    <GridItem display={{ base: "none", lg: "block" }} colSpan={{base: 0, lg: 2}} w='100%' h={'100%'}>
        <Sidebar/>
    </GridItem>
    <GridItem bgColor='teal.50' colSpan={{base: 13, lg: 11}} w='100%' h={'100%'}>
        <Outlet/>
    </GridItem>
    </Grid>
    )
}