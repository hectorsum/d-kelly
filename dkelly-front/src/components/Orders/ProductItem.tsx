import { Box } from '@chakra-ui/react'
import React from 'react'

interface IProduct {
  name: string,
}
export const ProductItem: React.FC<IProduct> = ({name}) => {
  return (
    <Box>
      {name}
    </Box>
  )
}
