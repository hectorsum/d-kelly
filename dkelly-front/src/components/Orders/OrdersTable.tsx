import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Box, Button, Flex, forwardRef, Icon, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Stack, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import MaterialTable from '@material-table/core';
import React, { FC, useEffect, useRef, useState } from 'react'
import dayjs from "dayjs";
import { FiEdit, FiEye, FiMoreVertical, FiXCircle } from 'react-icons/fi';
import { BsCart } from 'react-icons/bs';
import { FaIceCream, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { getCustomers } from '../../state/action-creators/customer';
import { getOrders } from '../../state/action-creators/order';
import { Customer, CustomerState } from '../../state/actions/customer';
import { Order, OrderState } from '../../state/actions/order';
import { localizationTable, optionsTable, headerStyle, cellStyle } from '../../utils/Table';
import {Link as ReactRouterLink} from 'react-router-dom';
import { WarningIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { setIsConfirming } from '../../state/action-creators/popup';

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
  const {customers} = useSelector((state: RootState) => state.customers) as CustomerState;
  const dispatch = useDispatch();
  useEffect(() => {
    const retrieveOrders = () => dispatch(getOrders());
    retrieveOrders();
  },[dispatch]);
  useEffect(() => {
    const retrieveCustomers = () => dispatch(getCustomers());
    retrieveCustomers();
  },[dispatch]);
  
  return <>
    {
      (!data.loading && customers) && <MaterialTable
          options={optionsTable}
          localization={localizationTable}
          columns={[
          { title: 'Cliente', field: 'customer', render: ({customer: customer_id}: Order) => {
            // const {fullname} = customers.find((c: Customer) => (c._id === customer_id) ? c.fullname : "") as Customer;
            const fullname = "" as string;
            return <Tooltip label={`Ver las ventas de ${(fullname.length > 0) ? fullname.split(" ")[0] : ""}`} 
                            bg='gray.300' 
                            color='black' 
                            hasArrow>
              <Link as={ReactRouterLink} color='teal.500' to={`/pedidos/cliente/${customer_id}`} textDecoration={"none"}>
                {(fullname && fullname.length > 0) ? fullname : ""}
              </Link>
            </Tooltip>
          }, headerStyle, cellStyle},
          { title: 'Productos', field: 'products', type: 'numeric',render: ({products}: Order) => {
            return <Popover>
              <PopoverTrigger>
                <Button size="sm">
                  <Icon
                    as={FaShoppingCart}
                    h={[4]}
                    w={[4]}
                    aria-label="Ver productos"
                  />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent w="100%">
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
                        justifyContent={"space-between"}
                        w="100%"
                      >
                        <Flex minW="fit-content">
                          <Badge
                            rounded="full"
                            px="2"
                            display={"flex"} justifyContent={"cemter"} alignItems={"center"}
                          >
                            <FaIceCream/>
                          </Badge>
                          <Text
                            fontSize={["sm", "md"]}
                            fontWeight="medium"
                            ml="2" mr={2}>
                            {product.name}
                          </Text>
                        </Flex>
                        <Stack minW={"50px"}>
                          <Badge variant='subtle' 
                                  rounded={"full"} 
                                  width={"auto"}
                                  colorScheme={"blue"}
                                  display={"flex"} 
                                  justifyContent={"center"}
                                  alignItems={"center"}>
                              <Text fontSize="md">{product.qty}</Text>
                          </Badge>
                        </Stack>
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
            return <Flex alignItems={"center"}>
              <Text mr={2} minW={"75px"}>{"S/."+(Math.round((rowdata.total!) * 100) / 100).toFixed(2)}</Text>
              { 
                (!rowdata.hasPaid) &&
                <Tooltip label={`Falta cancelar el pedido`}
                         bg='gray.300' 
                         color='black' 
                         hasArrow>
                  <Link m={0} display={"flex"} alignItems={"center"} onClick={() => dispatch(setIsConfirming({ isOpen: true, idSelected: rowdata._id! }))} >
                    <WarningIcon w={4} h={4} color={"yellow.500"}/>
                  </Link>
                </Tooltip>
              }
            </Flex>
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
