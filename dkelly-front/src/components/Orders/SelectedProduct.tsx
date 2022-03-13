import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Product } from '../../state/actions/product'
interface IProduct {
  product: Product
}
export const SelectedProduct: FC<IProduct> = ({product:{name,qty}}): JSX.Element => {
  return (
    <Box py={1} px={2} 
         w="fit-content" mb={1} mr={1}
         display="flex"
         rounded="full"
         bg={"blue.100"}>
      <Text fontSize='sm' mr={2}>
        {
          (name.includes("Helado")) ? name.replace("Helado","") : name
        }
      </Text>
      <Badge variant={"subtle"} 
             rounded={"full"}
             display={"flex"}
             alignItems={"center"}
             bg="gray.100"
             >{qty}</Badge>
    </Box>
  )
}
