import { PhoneIcon } from '@chakra-ui/icons'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import React, { Dispatch, FC, FocusEvent, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { getSingleCustomer } from '../../state/action-creators/customer'
import { Customer } from '../../state/actions/customer'

interface ICustomer {
  customer: Customer,
  setIsInputChanging: Dispatch<React.SetStateAction<boolean>>,
}

export const CustomerItem: FC<ICustomer> = ({customer, setIsInputChanging}): JSX.Element => {
  const dispatch = useDispatch();
  const selectCustomer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,id: string):void => {
    e.stopPropagation();
    console.log("id: ",id)
    dispatch(getSingleCustomer(id));
    setIsInputChanging(false);
  }
  return (
    <Flex w={"100%"}
          flexDir="row" 
          alignItems="center" 
          borderBottom={"1px solid #ccc"} 
          borderRadius={5} p={3}
          justifyContent={"space-between"}
          transition={"all 0.2s ease-out"}
          onClick={(e) => {
            selectCustomer(e, customer._id)
          }}
          _hover={{
            background:"blue.50",
            cursor: "pointer"
          }}>
      <Flex alignItems={"center"}>
        <Avatar mr={2} size="sm" name={customer.fullname}/>
        <Text fontSize='lg' color={"#222"}>{customer.fullname}</Text> 
      </Flex>
      {
        (customer.cellphone) && <Flex alignItems={"center"} justifyContent={"center"}>
          <PhoneIcon mr={3} w={4} h={4}/>
          <Text m={0}>
            {customer.cellphone.match(/.{1,3}/g)?.join("-")}
          </Text>
        </Flex>
      }
    </Flex>
  )
}
