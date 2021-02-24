import React from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { Form } from 'formik'
interface Props {
  title?: string
  isOpen: boolean
  onClose: () => void
  cta: string
}

const Modal: React.FC<Props> = ({
  children,
  isOpen,
  onClose,
  title,
  cta,
}): JSX.Element => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="orange" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
