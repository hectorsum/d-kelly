import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import {Input, FormControl, FormLabel, InputGroup} from '@chakra-ui/react';
import React, { FC, LegacyRef } from 'react'
interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export const AddProduct: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}): JSX.Element => {

  return (
    <Modal finalFocusRef={finalRef} 
           isOpen={isOpen} 
           onClose={onClose} 
           motionPreset='slideInBottom' 
           size={'lg'}
           >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Pedido</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired mb={4}>
            <FormLabel>Nombre de Producto</FormLabel>
            <InputGroup>
              <Input 
                type="text"
                name="product"
                placeholder="Buscar Producto"
                // onChange={onChange}
                autoComplete='off'
              />
            </InputGroup>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
