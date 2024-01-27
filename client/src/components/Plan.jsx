import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    List,
    ListIcon,
    ListItem,
    Center,
    Select,
    Radio,
    RadioGroup,
    AbsoluteCenter,
    Grid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from "@chakra-ui/react";
  
import { MdAlarm, MdLocationOn, MdOutlineCalendarMonth, MdAttachMoney } from 'react-icons/md'

const Plan = ({index, type, price, time, date, address, onOpen, changePlan}) => {
  return (
    <Card
        m={{ base: 4, md: 2 }}
        border={'2px solid white'}
        cursor={'pointer'}
        
        _hover={{
            border: '2px solid #09356b'
           
        }}>
            <CardHeader>
                <Heading fontFamily={'Montserrat'} size={'md'} textAlign={'center'}> {type} </Heading>
            </CardHeader>
            <CardBody>
                <List spacing={3}>
                <ListItem>
                    <p className='price'>
                        $ {price}
                    </p>
                    
                </ListItem>
                <ListItem>
                    <ListIcon as={MdOutlineCalendarMonth} color='green.500' />
                    {date || '-'}
                </ListItem>
                <ListItem>
                    <ListIcon as={MdAlarm} color='green.500' />
                    {time || '-'}
                </ListItem>
                <ListItem>
                    <ListIcon as={MdLocationOn} color='green.500' />
                    {address}
                </ListItem>
                </List>
            </CardBody>
            <CardFooter justifyContent={"center"}>
                    <Button 
                        color={"#09356b"} 
                        background={"white"}
                        cursor={"pointer"}
                        border={"2px solid #09356b"}
                        _hover={{
                                textDecoration: 'none',
                                bg: '#09356b',
                                color: 'white',
                                transition: 'all 0.5s ease'
                            }}
                            
                        onClick={function(event){ onOpen(); changePlan(index)}}
                            
                            >
                        Select Plan
                    </Button>   
            </CardFooter>
        </Card>
  )
}

export default Plan