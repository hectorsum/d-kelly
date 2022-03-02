import { Badge, forwardRef, IconButton, Menu, MenuButton, MenuItem, MenuList, Portal, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { FiEdit, FiMoreVertical, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { getProducts } from '../../state/action-creators/products';
import { Product, ProductState } from '../../state/actions/product';
import MaterialTable from '@material-table/core'
import { localizationTable, optionsTable, headerStyle, cellStyle } from '../../utils/Table';

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
    <MaterialTable
        options={optionsTable}
        localization={localizationTable}
        columns={[
        { title: 'Nombre', field: 'name', headerStyle, cellStyle},
        { title: 'Precio', field: 'price', type: 'numeric',render: ({price}: Product) => {
          return <Text ml={2}>{"S/."+price.toLocaleString()}</Text>
        }, headerStyle, cellStyle},
        { title: 'Stock', field: 'qty', render: ({qty}: Product) => {
          return <Stack direction='row' ml={2}>
            {
              (qty === 0) ? <Badge variant='solid' colorScheme={"red"}>Agotado</Badge> :
              <Badge variant='solid' colorScheme={(qty < 10) ? "yellow" : "green"}>{qty}</Badge>
            }
          </Stack>
        }, headerStyle, cellStyle},
        { title: 'Acciones', field: 'actions', render: (rowData: Product) => {
            return <Menu isLazy placement="left-start">
              <MenuButton as={ActionsButton}>
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem
                    icon={<FiEdit />} 
                    >Editar
                  </MenuItem>
                  <MenuItem
                    icon={<FiXCircle />} 
                   >
                    Eliminar
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
        }, headerStyle, cellStyle},
        ]}
        data={data.products}
    /> 
  )
}
