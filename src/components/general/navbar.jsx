import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { SidebarButton } from "./sidebarDrawer"

export const Navbar = ({heading}) => {
    const { name, imgProfile, isAdmin } = useSelector((state) => state.userSlice.value)
    return (
        <Flex
        w='100%'
        h='100%'
        bgColor={'purple.800'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={3}
        >
            <Flex gap={3}>
                <SidebarButton/>
                <Heading ml={5} color={'whiteAlpha.700'} fontSize={{base: '3xl', lg: '2xl'}}>
                    {heading}
                </Heading>
            </Flex>
            <Heading mr={5} color={'whiteAlpha.700'} fontSize={{base: '3xl', lg: '2xl'}}>{isAdmin ? 'Admin' : 'User'}</Heading>
        </Flex>
    )
}