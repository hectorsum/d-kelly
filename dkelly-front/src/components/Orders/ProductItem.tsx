import { Box, Button, Flex, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react'
import React from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

interface IProduct {
  name: string,
}
export const ProductItem: React.FC<IProduct> = ({name}) => {
  return (
    <Flex borderBottom={"1px solid #ccc"} 
          justifyContent={"space-between"} 
          borderRadius={5}
          alignItems={"center"} p={3} _hover={{
            bg: "green.100",
            cursor:"pointer"
          }}>
      <Text>
        {name}
      </Text>
      <InputGroup
        size="sm"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="110px"
        h={"30px"}
        // margin="0 auto"
      >
        <InputLeftElement>
          <Button
            rounded="full"
            size={'sm'} 
            // onClick={() => props.removeQtyProductCart(dish._id)}
          >
            <Icon as={FiMinus} h={4} w={4} />
          </Button>
        </InputLeftElement>
        <Input
          type="number"
          min="1"
          // size="sm"
          height="100%"
          textAlign="center"
          fontSize="md"
          name="product_quantity"
          value={"0"}
          isReadOnly
          variant="unstyled"
          // onChange={(e) =>
          //   props.updateProductCart(e.target.value, dish._id)
          // }
        />
        <InputRightElement>
          <Button
            rounded="full"
            size="sm"
            // onClick={() => props.addQtyProductCart(dish._id)}
          >
            <Icon as={FiPlus} h={4} w={4} />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}
