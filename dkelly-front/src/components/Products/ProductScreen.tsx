import { Box, Button, Container, Icon, Text, useDisclosure } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { FiPlus } from 'react-icons/fi'
import { AddProduct } from './AddProduct';
import { ProductsTable } from './ProductsTable';

export const ProductScreen = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLHeadingElement>(null);
  return (
    <Container maxW='container.xl' padding="5">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
        <Box >
          <Text fontSize="3xl"
                fontWeight="bold"
                lineHeight="short"
                >
            Productos
          </Text>
        </Box>
        <Button colorScheme="green" onClick={onOpen} leftIcon={<Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />}>
          Agregar Producto
        </Button>
      </Box>
      <ProductsTable/>
      {
        (isOpen) && <AddProduct initialRef={initialRef} finalRef={finalRef} isOpen={isOpen} onClose={onClose}/>
      }
    </Container>
  )
}
