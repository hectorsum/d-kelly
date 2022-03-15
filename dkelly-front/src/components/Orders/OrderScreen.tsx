import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Container, Icon, Text, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state";
import { confirmPayment } from "../../state/action-creators/order";
import { setIsConfirming } from "../../state/action-creators/popup";
import { PopupAction, PopupState } from "../../state/actions/popup";
import { AddOrder } from "./AddOrder";
import {OrdersTable} from "./OrdersTable";

export const OrderScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLHeadingElement>(null);
  const { isConfirming:{isOpen: isOpenConfirm, idSelected} }: PopupState = useSelector((state: RootState) => state.popup);

  const cancelRef = useRef<any>();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setIsConfirming({
      isOpen: false,
      idSelected: null
    }))
  }
  const handleConfirm = () => {
    handleClose();
    dispatch(confirmPayment(idSelected!))
  }
  console.log("isConfirming: ",isOpenConfirm)
  return (
    <Container maxW='container.xl' padding="5" >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
        <Box >
          <Text fontSize="3xl"
                fontWeight="bold"
                lineHeight="short"
                >
            Pedidos
          </Text>
        </Box>
        <Button colorScheme="green" onClick={onOpen} leftIcon={<Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />}>
          Agregar Pedido
        </Button>
      </Box>
      <OrdersTable/>
      {
        (isOpen) && <AddOrder initialRef={initialRef} finalRef={finalRef} isOpen={isOpen} onClose={onClose}/>
      }
      {
        (isOpenConfirm) && <AlertDialog
          isOpen={isOpenConfirm}
          leastDestructiveRef={cancelRef}
          onClose={handleClose}
          motionPreset='slideInBottom'
        >
          <AlertDialogOverlay/>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Confirmar Pago
            </AlertDialogHeader>

            <AlertDialogBody>
              El cliente ha cancelado el total de su pago
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleClose}>
                Cancelar
              </Button>
              <Button colorScheme='green' ml={3} onClick={handleConfirm}>
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    </Container>
  )
}
