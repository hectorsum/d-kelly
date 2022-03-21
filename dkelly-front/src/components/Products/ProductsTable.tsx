import { Badge, Flex, forwardRef, IconButton, Menu, MenuButton, MenuItem, MenuList, Portal, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { FiEdit, FiMoreVertical, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { getProducts } from '../../state/action-creators/products';
import { Product, ProductState } from '../../state/actions/product';
import MaterialTable from '@material-table/core'
import { localizationTable, optionsTable, headerStyle, cellStyle } from '../../utils/Table';
import { setIsDeleting, setIsEditing } from '../../state/action-creators/popup';
import { ActionsButton } from '../../utils/ActionsButton';

interface IProps {
  onOpenEdit: () => void,
  onOpenDelete: () => void,
}

export const ProductsTable: React.FC<IProps> = ({onOpenEdit, onOpenDelete}): JSX.Element => {
  const data: ProductState = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const handleEdit = (idSelected: string) => {
    onOpenEdit();
    dispatch(setIsEditing({
      idSelected,
      isOpen: true
    }))
  }
  const handleDelete = (idSelected: string) => {
    onOpenDelete();
    dispatch(setIsDeleting({
      idSelected,
      isOpen: true
    }))
  }
  useEffect(() => {
    const retrieveProducts = () => dispatch(getProducts());
    retrieveProducts();
  },[dispatch])
  return <>
    {
      (!data.loading) ? <MaterialTable
          options={optionsTable}
          localization={localizationTable}
          columns={[
          { title: 'Nombre', field: 'name', headerStyle, cellStyle},
          { title: 'Precio', field: 'price', type: 'numeric',render: ({price}: Product) => {
            return <Text ml={2}>{"S/."+(Math.round((price!) * 100) / 100).toFixed(2)}</Text>
          }, headerStyle, cellStyle},
          { title: 'Stock Unit', field: 'qty', render: ({qty}: Product) => {
            return <Stack direction='row'>
              {
                (qty === 0) ? <Badge variant='subtle' rounded="full" colorScheme={"red"} px={2} py={0}>
                  <Text fontSize="sm">Agotado</Text>
                </Badge> :
                <Stack minW={"30px"}>
                  <Badge variant='subtle' 
                         rounded="full" 
                         colorScheme={(qty < 10) ? "yellow" : "blue"}
                         width={"auto"}
                         display={"flex"} 
                         justifyContent={"center"}
                         alignItems={"center"}
                        >
                    <Text fontSize="sm">{qty}</Text>
                  </Badge>
                </Stack>
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
                      onClick={() => handleEdit(rowData._id!)}
                      >Editar
                    </MenuItem>
                    <MenuItem
                      icon={<FiXCircle />} 
                      onClick={() => handleDelete(rowData._id!)}
                    >
                      Eliminar
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
          }, headerStyle, cellStyle},
          ]}
          data={data.products}
      /> : <Flex w="100%" alignItems={"center"} justifyContent={"center"} minH={"150px"}>
        <Spinner thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='#b43137'
                size='xl'/>
      </Flex>
    }
  </>
}
