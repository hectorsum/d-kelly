import { Badge, Box, Button, forwardRef, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Stack, Text } from '@chakra-ui/react';
import MaterialTable from '@material-table/core';
import React, { FC, useEffect } from 'react'
import dayjs from "dayjs";
import { FiEdit, FiEye, FiMoreVertical, FiXCircle } from 'react-icons/fi';
import { BsCart } from 'react-icons/bs';
import { FaIceCream } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { getCustomers } from '../../state/action-creators/customer';
import { getOrders } from '../../state/action-creators/order';
import { Customer, CustomerState } from '../../state/actions/customer';
import { Order, OrderState } from '../../state/actions/order';
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
export const OrdersTable = (): JSX.Element => {
  const data = useSelector((state: RootState) => state.orders) as OrderState;
  //const {customers} = useSelector((state: RootState) => state.customers) as CustomerState;
  const dispatch = useDispatch();
  useEffect(() => {
    const retrieveOrders = () => dispatch(getOrders());
    retrieveOrders();
  },[]);
  
  // useEffect(() => {
  //   const retrieveCustomers = () => dispatch(getCustomers());
  //   retrieveCustomers();
  // },[dispatch]);
  
  console.log("orders: ",data.orders);
  return <>
    {
      (!data.loading) && <MaterialTable
          options={optionsTable}
          localization={localizationTable}
          columns={[
          { title: 'Cliente', field: 'customer', render: (rowData: Order) => {
            return 'Hector Herrera'
          }, headerStyle, cellStyle},
          { title: 'Productos', field: 'products', type: 'numeric',render: ({products}: Order) => {
            return <Popover>
              <PopoverTrigger>
                <Button size="sm">
                  <Icon
                    as={BsCart}
                    h={[4]}
                    w={[4]}
                    aria-label="Ver productos"
                  />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader fontWeight="semibold">
                    Productos
                  </PopoverHeader>
                  <PopoverCloseButton />
                  {(products) && products.map((product) => (
                    <PopoverBody key={product._id}>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Badge
                          rounded="full"
                          px="2"
                        >
                          <FaIceCream/>
                        </Badge>
                        <Text
                          fontSize={["sm", "md"]}
                          fontWeight="medium"
                          ml="2"
                        >
                          {product.name + " x " + product.qty}
                        </Text>
                      </Box>

                      {/* <Button colorScheme="blue">Button</Button> */}
                    </PopoverBody>
                  ))}
                  {/* <PopoverFooter>
                        This is the footer
                      </PopoverFooter> */}
                </PopoverContent>
              </Portal>
            </Popover>
          }, headerStyle, cellStyle},
          { title: 'Fecha', field: 'date', render: (rowdata: Order) => {
            return <Text>{dayjs(rowdata.date).format("DD/MM/YYYY HH:mma")}</Text>
          }, headerStyle, cellStyle},
          { title: 'Total', field: 'total', render: (rowdata: Order) => {
            return <Text>{"S/."+rowdata.total}</Text>
          }, headerStyle, cellStyle},
          { title: 'Acciones', field: 'actions', render: (rowData: Order) => {
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
          data={data.orders}
      /> 
    }
  </>
}
