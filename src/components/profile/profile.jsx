import { Avatar, Stack, Text, Heading, Icon, Flex } from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { convertToRp } from "../../helper/rupiah";
import { useSelector } from "react-redux";

export const Profile = () => {

    const { id, name, imgProfile, isAdmin, email, salary, Shift } = useSelector((state) => state.userSlice.value)

    return (
        <Stack bgColor={'cyan.100'} w='100%' h={'100%'} gap={2} alignItems={'center'} >
            <Stack w='100%' h={{ base: '40%', md: '60%', lg:'100%' }} alignItems={'center'}>
                <Avatar mt={4} size='2xl' src={`http://localhost:8000/${imgProfile}`} />
                <Stack justifyContent={'center'} alignItems={'center'} gap={1}>
                    <Heading> {name} </Heading>
                    <Text color='gray.500' fontWeight={'light'}>ID: {id} </Text>
                    {isAdmin ? ( <Text fontWeight={'medium'} > Admin </Text> ) : ( <Text fontWeight={'medium'} > Employee </Text> ) }
                    <Flex alignItems={'center'} color={'gray.800'} gap={2} >
                        <Icon as={MdOutlineEmail} w='5' h='5' />
                        <Text> {email} </Text>
                    </Flex>
                </Stack>
                    <Flex mt={5} w='100%' justifyContent={'space-evenly'}>
                        <Stack>
                            <Text fontWeight={'medium'} > Salary </Text>
                            <Text > {convertToRp(salary)} </Text>
                        </Stack>
                        <Stack>
                            <Text fontWeight={'medium'} > Shift </Text>
                            <Text > {Shift?.shiftStart?.substring(0,5)}-{Shift?.shiftEnd?.substring(0,5)} </Text>
                        </Stack>
                    </Flex>
            </Stack>
        </Stack>
    )
}