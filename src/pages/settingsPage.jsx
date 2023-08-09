import { Grid, GridItem, Stack } from '@chakra-ui/react'
import { Navbar } from '../components/general/navbar'
import { ChangeAvatar } from '../components/profile/uploadAvatar'
import { ChangeEmail } from '../components/profile/changeEmail'
import { Profile } from '../components/profile/profile'
import { ChangeName } from '../components/profile/changeName'
import { ChangePassword } from '../components/profile/changePassword'

export const SettingsPage = () => {
    return (
        <Grid templateRows={'1fr 7fr'} templateColumns={'3fr 8fr'} bgColor='' w='100%' h='100%' overflowX={'hidden'}>
        <GridItem bgColor={'purple.500'} colSpan={2} rowSpan={1} w='100%' h={'100%'}>
            <Navbar heading={'Settings'} />
        </GridItem>
        <GridItem bgColor={'red'} rowSpan={1} colSpan={{ base: 2, lg: 1 }} w='100%' h={'100%'}>
            <Profile/>
        </GridItem>
        <GridItem p={6} rowSpan={1} colSpan={{ base: 2, lg: 1 }} w='100%' h={'100%'}>
            <Stack gap={3}>
                <ChangeAvatar/>
                <ChangeName />
                <ChangeEmail/>
                <ChangePassword/>
            </Stack>
        </GridItem>
        </Grid>
    )
}