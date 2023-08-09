import { Avatar, Box, Flex, Heading, Icon, Input, List, ListIcon, ListItem, Menu, MenuButton, MenuIcon, MenuItem, MenuList, Stack, Text, useDisclosure, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Center } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { GrLogout } from 'react-icons/gr';
import { BsPerson } from 'react-icons/bs';
import { changeUrl } from "../../redux/navigationSlice";

export const Sidebar = () => {
    const navigate = useNavigate();
    const { name, imgProfile, isAdmin, id } = useSelector((state) => state.userSlice.value)
    const { currentUrl } = useSelector((state) => state.navigationSlice.value)
    const dispatch = useDispatch();
    const toast = useToast();
    const token = localStorage.getItem('token');
    const params = useParams();

    const handleNavigation = (value) => {
        dispatch( changeUrl({currentUrl: value}) )
        navigate(value);
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login');
    }
    
    return (
        <>
        <Stack display={'flex'} p={4} w={'100%'} h={'100%'} bgColor={'purple.900'} justifyContent={'space-between'}>
            <Stack gap={5} color={'whiteAlpha.700'}>
                <Flex w='100%' gap={3} justifyContent={'center'} alignItems={'center'}>
                    <Heading fontSize={{base: '3xl', lg: '2xl'}}>ComfyPOS</Heading>
                </Flex>
                <List spacing={3}>
                    {isAdmin ? (
                    <ListItem cursor={'pointer'} onClick={() => handleNavigation('/users')} p={2} borderRadius={'10px'} bgColor={currentUrl === '/users' ? 'whiteAlpha.500' : null} color={currentUrl === '/cashiers' ? 'white' : null}>
                        User List
                    </ListItem>
                    ) : (
                    <>
                    <ListItem cursor={'pointer'} onClick={() => handleNavigation('/')} p={2} borderRadius={'10px'} bgColor={currentUrl === '/' ? 'whiteAlpha.500' : null} color={currentUrl === '/' ? 'white' : null}>
                        Dashboard
                    </ListItem>
                    <ListItem cursor={'pointer'} onClick={() => handleNavigation(`/record/${id}`)} p={2} borderRadius={'10px'} bgColor={currentUrl === '/record' ? 'whiteAlpha.500' : null} color={currentUrl === '/statistics' ? 'white' : null}>
                        Record
                    </ListItem>
                    </>
                    )}
                    <ListItem cursor={'pointer'} onClick={() => handleNavigation(`/payroll`)} p={2} borderRadius={'10px'} bgColor={currentUrl === '/payroll' ? 'whiteAlpha.500' : null} color={currentUrl === '/statistics' ? 'white' : null}>
                        Payroll
                    </ListItem>
                    <ListItem cursor={'pointer'} onClick={() => handleNavigation(`/settings`)} p={2} borderRadius={'10px'} bgColor={currentUrl === '/profile' ? 'whiteAlpha.500' : null} color={currentUrl === '/cashiers' ? 'white' : null}>
                        Settings
                    </ListItem>
                </List>
            </Stack>
            <Menu>
                <MenuButton>
                    <Flex gap={4} alignItems={'center'} p={1} border={'2px solid'} borderColor={'whiteAlpha.700'} bgColor={'none'} borderRadius={'40px'} >
                        <Avatar 
                        name={name} 
                        src={`http://localhost:8000/${imgProfile}`}
                        size={'sm'}
                        />
                            <Text fontSize={'md'} color={'white'}>
                                {name}
                            </Text>
                    </Flex>
                </MenuButton>
                <MenuList alignItems={'center'}>
                    <MenuItem
                    onClick={handleLogout}
                    gap={3}
                    alignSelf={'center'}
                    >
                        <Icon as={GrLogout} w='5' h='5' color={'red'} />
                        Log out
                    </MenuItem>
                </MenuList>
            </Menu>
        </Stack>
        </>
    )
}