import { Grid, GridItem } from '@chakra-ui/react'
import { UserList } from '../components/userList/userList'
import { Navbar } from '../components/general/navbar'

export const UserListPage = () => {
    return (
    <Grid templateRows={'1fr 7fr'} bgColor='' w='100%' h='100%' overflowX={'hidden'}>
    <GridItem bgColor={'purple.500'} rowSpan={1} w='100%' h={'100%'}>
        <Navbar/>
    </GridItem>
    <GridItem 
    overflowY={'auto'} 
    rowSpan={1} 
    w='100%' 
    h={'100%'}
    sx={
        { 
       '::-webkit-scrollbar':{
              display:'none'
          }
       }
    }
    >
        <UserList />
    </GridItem>
    </Grid>
    )
}