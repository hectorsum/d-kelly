import { Input, InputGroup, Avatar, Button, Flex, FormControl, FormLabel, Icon, Text, Textarea, InputRightElement,InputLeftElement, Box, Spacer } from '@chakra-ui/react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { FC, LegacyRef, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { PhoneIcon } from '@chakra-ui/icons'
import { ProductsWrapper } from './ProductsWrapper'
import { Product, ProductState } from '../../state/actions/product'
import { useSelector } from 'react-redux'
import { RootState } from '../../state'
import { ProductItem } from './ProductItem'

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export const AddOrder: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  const [isActive, setIsActive] = useState(false);
  const {products}: ProductState = useSelector((state: RootState) => state.products);
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
  const handleIncrease = () => {
    console.log('clicked!')
    return;
  }
  
  return (
    <Modal finalFocusRef={finalRef} 
           isOpen={isOpen} 
           onClose={onClose} 
           motionPreset='slideInBottom' 
           size={'md'}
           >
      <ModalOverlay />
      <ModalContent onBlur={() => setIsActive(false)}>
        <ModalHeader>Agregar Pedido</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired mb={4}>
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
          <FormControl isRequired mb={4}>
            <FormLabel>Productos</FormLabel>
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
                  placeholder="Buscar Producto"
                  onChange={onChange}
                  autoComplete='off'
                  onClick={() => setIsActive(true)}
                />
            </InputGroup>
          </FormControl>
          {
            (isActive) && <ProductsWrapper>
              {
                products.map((p: Product) => (
                  <ProductItem key={p._id} name={p.name}/>
                ))
              }
            </ProductsWrapper>
          }
          <FormControl isRequired mb={4}>
            <FormLabel>Notas</FormLabel>
            <Textarea placeholder='' />
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
