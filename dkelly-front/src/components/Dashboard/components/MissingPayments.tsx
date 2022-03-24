import { WarningIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Link, Text, Tooltip, VStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link as ReactRouterLink} from 'react-router-dom';
import { RootState } from '../../../state';
import { setIsConfirming } from '../../../state/action-creators/popup';
import { Customer, CustomerState } from '../../../state/actions/customer';
import { OrderState } from '../../../state/actions/order';

export const MissingPayments: FC = (): JSX.Element => {  
  const {orders}: OrderState = useSelector((state: RootState) => state.orders);
  const {customers}: CustomerState = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();
  const customerFound = (customer_id: string) => {
  const customer = customers.find((c: Customer) => ((customer_id) && c._id === customer_id) ? c.fullname : "") as Customer;
    return customer.fullname;
  }
  const handleConfirmation = (idSelected: string) => {
    // onOpenConfirmation();
    dispatch(setIsConfirming({ isOpen: true, idSelected: idSelected }))
  }
  return (
    <Box alignItems={"flex-start"} 
            maxH={"400px"} 
            overflow={"auto"} display={"flex"} flexDirection={"column"}>
      {
        (customers && orders) && orders.map((order) => !order.hasPaid && (
          <HStack border="1px solid #e2e8f0;" 
                  width={"100%"} p={5} 
                  justifyContent={"space-between"} 
                  bg={"white"}>
            <Tooltip label={`Ver las ventas de Hector`} 
                            bg='gray.300' 
                            color='black' 
                            hasArrow>
              <Link as={ReactRouterLink} color='teal.500' to={`/pedidos/cliente/${order.customer}`} textDecoration={"none"}>
                {customerFound(order.customer)}
              </Link>
            </Tooltip>
            <Flex>
              <Text mr={5}>{"S/."+(Math.round((order.total!) * 100) / 100).toFixed(2)}</Text>
              <Tooltip label={`Falta cancelar el pedido`}
                              bg='gray.300' 
                              color='black' 
                              hasArrow>
                  <Link m={0} display={"flex"} alignItems={"center"} onClick={() => handleConfirmation(order._id!)}>
                    <WarningIcon w={4} h={4} color={"yellow.500"}/>
                  </Link>
              </Tooltip>
            </Flex>
          </HStack>
        ))
      }
    </Box>
  )
}
