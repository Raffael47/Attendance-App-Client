import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
import { ButtomTemp } from './button'

  export const Confirmation = ({ action, content, func, type }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <ButtomTemp type='submit' func={onOpen} content={content} />

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Are you sure you want to {action}? </ModalHeader>
            <ModalCloseButton />

            <ModalFooter>
                <ButtomTemp type={type} colorScheme='cyan' func={func} content={'Confirm'} />
                <ButtomTemp colorScheme='pink' func={onClose} content={'Cancel'} />
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
  }