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
    useDisclosure,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from "@chakra-ui/react";
import { useState } from "react";

import PaymentHandler from "../components/PaymentHandler";
import Plan from "../components/Plan"

export default function LeagueRegistration() {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedPlan, setPlanValue] = useState(0)

    const changePlan = (planIndex) => {
        console.log(planIndex);
        setPlanValue(planIndex);
    };


    const plans = [
        {
            type: "Friday Membership",
            price: "150",
            time: "21:00 - 23:00",
            date: "2023-09-01 To 2023-12-08",
            address: " 5th floor - 255 Ontario St E, Montreal, Quebec H2X 1X6"
        },
        {
            type: "Sunday Membership",
            price: "150",
            time: "10:00 - 12:00",
            date: "2023-09-03 To 2023-12-10",
            address: " 5th floor - 255 Ontario St E, Montreal, Quebec H2X 1X6"
        },
        {
            type: "Drop In",
            price: "15",
            time: "",
            date: "",
            address: " 5th floor - 255 Ontario St E, Montreal, Quebec H2X 1X6"
        },
        {
            type: "Kids Training Camp",
            price: "650",
            time: "17:00 - 19:00",
            date: "2023-09-16 To 2024-05-11",
            address: " 5th floor - 255 Ontario St E, Montreal, Quebec H2X 1X6"
        },
    ]


    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Selected Plan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TableContainer mb={'50px'} overflow={'hidden'}>
                            <Table variant='simple'>
                                <Tbody>
                                    <Tr>
                                        <Td fontWeight={'bold'}>Plan Type</Td>
                                        <Td>{plans[selectedPlan] && plans[selectedPlan].type}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td  fontWeight={'bold'}>Price</Td>
                                        <Td>$ {plans[selectedPlan] && plans[selectedPlan].price}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight={'bold'}>Date</Td>
                                        <Td>{plans[selectedPlan] && plans[selectedPlan].date}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight={'bold'}>Time</Td>
                                        <Td>{plans[selectedPlan] && plans[selectedPlan].time}</Td>
                                    </Tr>
                                    {/* <Tr>
                                        <Td>Address</Td>
                                        <Td>{plans[selectedPlan] && plans[selectedPlan].address}</Td>
                                    </Tr> */}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <PaymentHandler amount={plans[selectedPlan].price} selectedPlan={selectedPlan}/>
                    </ModalBody>

                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            
        
            <Flex
                minH={"calc(100vh - 70px)"}
                align={"center"}
                justify={"space-evenly"}
                bg={useColorModeValue("gray.50", "gray.800")}
                direction={{ base: 'column', md: 'row' }}
                >
                    {
                        plans.map((plan, index) => {
                            return <Plan key={index} index={index} {...plan}  onOpen={onOpen} changePlan={changePlan}/>;
                        })
                    }
                    
            </Flex>
        </>
    )
}
