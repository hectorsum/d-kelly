import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Container, Icon, Text, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state";
import { confirmPayment } from "../../state/action-creators/order";
import { setIsConfirming } from "../../state/action-creators/popup";
import { PopupAction, PopupState } from "../../state/actions/popup";
import { CustomAlert, ModalTypes } from "../../utils/CustomAlert";
import { AddOrder } from "./AddOrder";
import { EditOrder } from "./EditOrder";
import {OrdersTable} from "./OrdersTable";

export const OrderScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpenEdit, onOpen: onOpenEdit, onClose:onCloseEdit } = useDisclosure();
  const { isOpen:isOpenDelete, onOpen: onOpenDelete, onClose:onCloseDelete } = useDisclosure();
  //Add
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLHeadingElement>(null);
  //Edit
  const editInitRef = useRef<HTMLInputElement>(null);
  const editFinalRef = useRef<HTMLHeadingElement>(null);
  //Delete
  const deleteInitRef = useRef<HTMLInputElement>(null);
  const deleteFinalRef = useRef<HTMLButtonElement>(null);
  const { isConfirming, isEditing}: PopupState = useSelector((state: RootState) => state.popup);
  return (
    <Container maxW='container.lg' padding="5" >
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
        (isOpen) && <AddOrder initialRef={initialRef} 
                              finalRef={finalRef} 
                              isOpen={isOpen} 
                              onClose={onClose}/>
      }
      {
        (isEditing.isOpen) && <EditOrder initialRef={editInitRef} 
                                   finalRef={editFinalRef} 
                                   isOpen={isEditing.isOpen} 
                                   onClose={onCloseEdit}/>
      }
      {
        (isConfirming.isOpen) && <CustomAlert isOpenDelete={true} 
                                        onOpenDelete={onOpenDelete} 
                                        onCloseDelete={onCloseDelete}
                                        deleteInitRef={deleteInitRef}
                                        deleteFinalRef={deleteFinalRef}
                                        idSelected={isConfirming.idSelected!}
                                        alertType={ModalTypes.CONFIRMATION}/>
      }
    </Container>
  )
}
