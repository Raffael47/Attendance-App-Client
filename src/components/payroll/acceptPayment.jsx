import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    Button,
    ModalBody,
    useToast,
    Text,
    Stack,
    Flex,
    Divider
  } from '@chakra-ui/react'
import axios from 'axios';
import { ButtomTemp } from '../general/button';
import { convertToRp } from '../../helper/rupiah';
import { useSelector } from 'react-redux';

  export const AcceptPayment = ({ status, net, tax, deduction, date }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const token = localStorage.getItem('token');
    const toast = useToast();
    const { salary } = useSelector(state => state.userSlice.value)

    const handleAccept = async() => {
        try {
            await axios.patch('http://localhost:8000/api/payrolls/accept', {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            toast({
                status: 'success',
                title: 'Payment received',
                isClosable: true,
                duration: 1500
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
            toast({
                status: 'error',
                title: 'Failed to receive payment',
                isClosable: true,
                duration: 1500
            })
        }
    }
    return (
        <>
        <Button
        variant={'outline'}
        fontWeight={'medium'}
        color={status === 'PAID' ? 'green.800' : status ==='PENDING' ? 'yellow.800' : 'red.800'}
        border={'1px solid'}
        borderRadius={'20px'}
        alignItems={'center'}
        justifyContent={'center'}
        isDisabled={status === 'PAID' ? true : false}
        onClick={status === 'PAID' ? null : onOpen}
        borderColor={status === 'PAID' ? 'green.800' : status ==='PENDING' ? 'yellow.800' : 'red.800'}
        >
            {status}
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Accept Payroll? </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
            <Stack gap={4}>
                    <Stack gap={1}>
                        <Text fontWeight={'medium'}> Date </Text>
                        <Text color={'gray.500'}> {date} </Text>
                    </Stack>
                    <Stack>
                        <Flex justifyContent={'space-between'} w={'100%'}>
                            <Text>Gross</Text>
                            <Text>{convertToRp(salary)}</Text>
                        </Flex>
                        <Flex justifyContent={'space-between'} w={'100%'}>
                            <Text>Deduction</Text>
                            <Text>{convertToRp(deduction)}</Text>
                        </Flex>
                        <Flex justifyContent={'space-between'} w={'100%'}>
                            <Text>Tax 15%</Text>
                            <Text>{convertToRp(tax)}</Text>
                        </Flex>
                        <Divider color={'black'}/>
                        <Flex justifyContent={'space-between'} w={'100%'}>
                            <Text>Net Salary</Text>
                            <Text>{convertToRp(net)}</Text>
                        </Flex>
                    </Stack>
                </Stack>
                <Text size={'xs'} color={'gray.500'}>
                    Make sure to check if you've received in your salary in your back account before you click confirm.
                </Text>
            </ModalBody>

            <ModalFooter gap={3}>
                <ButtomTemp colorScheme='cyan' func={() => handleAccept()} content={'Confirm'} />
                <ButtomTemp colorScheme='pink' func={onClose} content={'Cancel'} />
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
  }