import { Input, InputGroup, Avatar, Button, Flex, FormControl, FormLabel, Icon, Text, Textarea, InputRightElement,InputLeftElement, Box, Spacer } from '@chakra-ui/react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { FC, LegacyRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { PhoneIcon } from '@chakra-ui/icons'

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export interface Item {
  label: string;
  value: string;
  qty: number;
}
export const AddOrder: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  const countries = [
    { value: "ghana", label: "Ghana", qty: 0 },
    { value: "nigeria", label: "Nigeria", qty: 0 },
    { value: "kenya", label: "Kenya", qty: 0 },
    { value: "southAfrica", label: "South Africa", qty: 0 },
    { value: "unitedStates", label: "United States", qty: 0 },
    { value: "canada", label: "Canada", qty: 0 },
    { value: "germany", label: "Germany", qty: 0 }
  ];
  const [pickerItems, setPickerItems] = useState(countries);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const handleCreateItem = (item: Item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };
  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value
    // });
  }
  const saveCustomer = (e: any) => {
    e.preventDefault();
    // dispatch(addCustomer(formData));
    onClose();
  }
  const handleIncrease = () => {
    console.log('clicked!')
    return;
  }
  const customRender = (selected: Item) => {
    console.log(selectedItems);
    let element = selectedItems.find((item: Item) => {
      return (item.value === selected.value)
    })
    return (
      <Box display={"flex"} justifyContent={"space-between"} position={"relative"} minWidth={"300px"}>
        <Box display={"flex"} alignItems={"center"} mr={5}>
          <Avatar mr={2} size="sm" name={element ? element.label: selected.label} />
          <Text>{element ? element.label : selected.label}</Text>
        </Box>
          {
            (element) && <InputGroup
                size="sm"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="110px"
                position={"absolute"}
                left="80%"
                  
              >
                <InputLeftElement>
                  <Button
                    rounded="full"
                    size={"sm"}
                    // onClick={handleIncrease}
                  >
                    <Icon as={FiMinus} h={4} w={4} />
                  </Button>
                </InputLeftElement>
                <Input
                  type="number"
                  min="1"
                  // size="sm"
                  height="100%"
                  textAlign="center"
                  fontSize="md"
                  name="product_quantity"
                  value={0}
                  isReadOnly
                  variant="unstyled"
                  // onChange={(e) =>
                  //   props.updateProductCart(e.target.value, dish._id)
                  // }
                />
                <InputRightElement>
                  <Button
                    rounded="full"
                    size="sm"
                    onClick={handleIncrease}
                    // onClick={() => props.addQtyProductCart(dish._id)}
                  >
                    <Icon as={FiPlus} h={4} w={4} />
                  </Button>
                </InputRightElement>
            </InputGroup>
          }
      </Box>
    )
  }
  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={'md'}>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>Agregar Pedido</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired mb={4}>
            <FormLabel>Cliente</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children={<AiOutlineSearch color='gray.300' />}
              />
                <Input
                  type="search"
                  name="customer"
                  placeholder="Buscar por Nombre"
                  onChange={onChange}
                  value={"Hector Herrera"}
                  autoComplete='off'
                />
            </InputGroup>
          </FormControl>
          <CUIAutoComplete
              label="Products"
              placeholder="Nombre de producto"
              onCreateItem={handleCreateItem}
              items={pickerItems}
              itemRenderer={customRender}
              selectedItems={selectedItems}
              renderCustomInput={(inputProps) => (<InputGroup><InputLeftElement pointerEvents="none" children={<PhoneIcon color="gray.300" />} /><Input {...inputProps} /></InputGroup>)}
              onSelectedItemsChange={(changes) =>
                handleSelectedItemsChange(changes.selectedItems)
              }
            />
          <FormControl isRequired mt={4}>
            <FormLabel>Notas</FormLabel>
            <Textarea placeholder='' />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button colorScheme='blue' onClick={(e) => saveCustomer(e)}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
