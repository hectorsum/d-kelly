import { Input, InputGroup, Avatar, Button, Flex, FormControl, FormLabel, Icon, Text, Textarea, InputRightElement,InputLeftElement, Box, Spacer, IconButton } from '@chakra-ui/react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { FC, LegacyRef, useEffect, useMemo, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { ArrowDownIcon, ArrowUpDownIcon, PhoneIcon, SearchIcon } from '@chakra-ui/icons'
import { Product, ProductState } from '../../state/actions/product'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state'
import { ProductItem } from './ProductItem'
import { getProducts } from '../../state/action-creators/products'
import { removeAllProducts } from '../../state/action-creators/cart'
import { CartState } from '../../state/actions/cart'
import {addOrder} from '../../state/action-creators/order'

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export const AddOrder: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  const [isActive, setIsActive] = useState(false);
  const {products}: ProductState = useSelector((state: RootState) => state.products);
  const {cart}: CartState = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    customer: "621c2280440663345398475c",
    product: "",
    products: [],
    notes: ""
  })
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const saveOrder = () => {
    dispatch(addOrder({
      customer: formData.customer,
      products: cart,
      notes: formData.notes
    }));
    onClose();
  }
  const filteredCars = useMemo(() => 
  products.filter((p: Product) => (typeof p.name === 'string' && formData.product) && p.name.toLowerCase().includes(formData.product.toLowerCase())),
  [products, formData.product]);
  const closeModal = () => {
    dispatch(removeAllProducts())
    onClose()
  }
  useEffect(() => {
    const retrieveProducts = () => dispatch(getProducts());
    retrieveProducts();
  },[dispatch])
  
  console.log({filteredCars})
  return (
    <Modal finalFocusRef={finalRef} 
           isOpen={isOpen} 
           onClose={closeModal} 
           motionPreset='slideInBottom' 
           size={'lg'}
           >
      <ModalOverlay />
      <ModalContent>
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
                  value={formData.customer}
                  autoComplete='off'
                />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>Productos</FormLabel>
            <InputGroup>
              {/* <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children={<AiOutlineSearch color='gray.300' />}
              /> */}
              <Input 
                type="text"
                name="product"
                placeholder="Buscar Producto"
                onChange={onChange}
                autoComplete='off'
                onClick={() => setIsActive(true)}
                mr={1}
              />
              <IconButton aria-label='Search Product' 
                          icon={<ArrowUpDownIcon />} 
                          onClick={() => setIsActive(!isActive)}/>
            </InputGroup>
          </FormControl>
          {
            (isActive && filteredCars.length > 0) && <Box onChange={() => setIsActive(true)} 
                               border="1px solid #ccc" mt={2} mb={4}
                               borderBottom={"none"}
                               borderRadius={5}>
              {
                filteredCars.map((p: Product) => (
                  <ProductItem key={p._id} product={p}/>
                ))
              }
            </Box>
          }
          <FormControl isRequired mb={4}>
            <FormLabel>Notas</FormLabel>
            <Textarea placeholder='' />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={closeModal}>
            Cerrar
          </Button>
          <Button colorScheme='blue' onClick={() => saveOrder()}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
