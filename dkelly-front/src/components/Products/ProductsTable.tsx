import { forwardRef, IconButton } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { FiMoreVertical } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { getProducts } from '../../state/action-creators/products';
import { ProductState } from '../../state/actions/product';

export const ActionsButton = forwardRef(({ label, ...rest }, ref) => {
  return (
    <IconButton
      ref={ref}
      d="inline-flex"
      borderRadius="full"
      variant="ghost"
      color="inherit"
      colorScheme="gray"
      bg="transparent"
      opacity="0.5"
      _hover={{ opacity: 1, bg: "rgba(0, 0, 0, 0.05)" }}
      _focus={{ opacity: 1, boxShadow: "outline" }}
      _active={{ bg: "rgba(0, 0, 0, 0.1)" }}
      icon={<FiMoreVertical />}
      aria-label=""
      {...rest}
    />
  );
});
export const ProductsTable: React.FC = (): JSX.Element => {
  const data: ProductState = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    const retrieveProducts = () => dispatch(getProducts());
    retrieveProducts();
  },[dispatch])
  console.log(data.products);
  return (
    <div>ProductsTable</div>
  )
}
