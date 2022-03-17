import { ArrowUpDownIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, FormLabel, IconButton, Input, InputGroup, InputLeftElement, Spacer, Switch, Textarea } from '@chakra-ui/react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { FC, LegacyRef, useEffect, useMemo, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { CustomerItem } from './CustomerItem'
import { ProductItem } from './ProductItem'
import { SelectedProduct } from './SelectedProduct'
import { Customer, CustomerState } from '../../state/actions/customer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state'
import { removeAllProducts } from '../../state/action-creators/cart'
import { addOrder } from '../../state/action-creators/order'
import { Product, ProductState } from '../../state/actions/product'
import { CartState } from '../../state/actions/cart'

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export const EditOrder: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}): JSX.Element => {
  const [isActive, setIsActive] = useState(false);
  const [isInputChanging, setIsInputChanging] = useState(false);
  const {cart}: CartState = useSelector((state: RootState) => state.cart);
  const {products}: ProductState = useSelector((state: RootState) => state.products);
  const {customer: customerSelected,customers}: CustomerState = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    customerid:"",
    customer: "",
    product: "",
    products: [],
    notes: "",
  })
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const closeModal = () => {
    // dispatch(removeAllProducts())
    onClose()
  }
  const saveOrder = () => {
    dispatch(addOrder({
      customer: formData.customerid,
      products: cart,
      notes: formData.notes,
      hasPaid: hasPaid
    }));
    dispatch(removeAllProducts())
    onClose();
  }
  const filteredProducts = useMemo(() => 
  products.filter((p: Product) => (typeof p.name === 'string' && formData.product && p.qty > 0) && p.name.toLowerCase().includes(formData.product.toLowerCase())),
  [products, formData.product]);
  
  const filteredCustomers = useMemo(() => 
  customers.filter((c: Customer) => (typeof c.fullname === 'string' && formData.customer) && c.fullname.toLowerCase().includes(formData.customer.toLowerCase())),
  [customers, formData.customer]);

  return (
    <Modal finalFocusRef={finalRef} 
           isOpen={isOpen} 
           onClose={closeModal} 
           motionPreset='slideInBottom' 
           size={'lg'}
           >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Pedido</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired mb={4} position={"relative"}>
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
                  onClick={() => setIsInputChanging(true)}
                  value={formData.customer}
                  autoComplete='off'
                />
            </InputGroup>
            {
              (isInputChanging && filteredCustomers.length > 0) && <Box 
                            display={"block"}
                            position={"absolute"}
                            zIndex={999}
                            background={"#fff"}
                            w={"100%"}
                            border="1px solid #ccc" mt={2} mb={4}
                            borderBottom={"none"}
                            borderRadius={5}
                            boxShadow={"0 0 0 1px rgba(0,0,0,.1)"}>
              {
              filteredCustomers.map((c: Customer) => (
                <CustomerItem key={c._id} 
                              customer={c} 
                              setIsInputChanging={setIsInputChanging}/>
              ))
              }
              </Box>
            }
          </FormControl>
          <FormControl isRequired mb={4} position="relative">
            <FormLabel>Productos</FormLabel>
            <InputGroup>
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
            {
              (cart.length > 0) && <Flex flexWrap={"wrap"} mt={2}>
                {
                  cart.map(p => (
                    <SelectedProduct key={p._id} product={p}/>
                  ))
                }
              </Flex>
            }
            {
              (isActive && filteredProducts.length > 0) && <Box 
                                position={"absolute"}
                                display={"block"}
                                w="100%"
                                zIndex={999}
                                bg="#fff"
                                border="1px solid #ccc" mt={2} mb={4}
                                borderBottom={"none"}
                                borderRadius={5}
                                boxShadow={"0 0 0 1px rgba(0,0,0,.1)"}>
                {
                  filteredProducts.map((p: Product) => (
                    <ProductItem key={p._id} product={p}/>
                  ))
                }
              </Box>
            }
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Notas</FormLabel>
            <Textarea onChange={onChange} name={"notes"} value={formData.notes} resize={"none"}/>
          </FormControl>
          <FormControl isRequired>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Spacer/>
              <FormControl display='flex' alignItems='center' width="fit-content">
                <FormLabel htmlFor='email-alerts' mb='0' cursor="pointer">
                  ¿Esta cancelado completo?
                </FormLabel>
                <Switch id='email-alerts' size="lg" onChange={(e) => setHasPaid(!hasPaid)} name={"hasPaid"}/>
              </FormControl>
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={closeModal}>
            Cerrar
          </Button>
          <Button colorScheme='yellow' onClick={() => saveOrder()}>Editar Pedido</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
