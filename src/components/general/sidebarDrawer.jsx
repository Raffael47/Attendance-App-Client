import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Icon, Image, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Sidebar } from "./sidebar";
import { FaBars } from 'react-icons/fa'

export const SidebarButton = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
        <Button _hover={{bgColor: 'purple.800', color:'white'}} bgColor={'purple.800'} display={{base: 'block', lg: 'none'}} onClick={onOpen} border={'none'} >
            <Icon as={FaBars} w='5' h='5' color={'whiteAlpha.500'} display={{base: 'block', lg:'none'}} />
        </Button>
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            size={'xs'}
        >
            <DrawerOverlay />
            <DrawerContent >
                <Sidebar/>
            </DrawerContent>
        </Drawer>
        </>
    )
}