import { Button, FormControl, FormLabel } from '@chakra-ui/react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import React, { FC, LegacyRef } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}

export const AddOrder: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value
    // });
  }
  const saveCustomer = (e: any) => {
    e.preventDefault();
    // dispatch(addCustomer(formData));
    onClose();
  }
  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={'md'}>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>Agregar Pedido</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Cliente</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children={<AiOutlineSearch color='gray.300' />}
              />
                <Input
                  type="search"
                  name="customer"
                  placeholder="Buscar por Nombre"
                  onChange={onChange}
                  value={"Hector Herrera"}
                  autoComplete='off'
                />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Telefono</FormLabel>
            <Input placeholder='Telefono' name="cellphone" onChange={(e) => onChange(e)}/>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Direccion</FormLabel>
            <Input placeholder='Direccion' name="address" onChange={(e) => onChange(e)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button colorScheme='blue' onClick={(e) => saveCustomer(e)}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
