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
  } from "@chakra-ui/react";

  import { MdAlarm, MdLocationOn, MdOutlineCalendarMonth, MdAttachMoney } from 'react-icons/md'

export default function LeagueRegistration() {
    return (
        <Flex
            minH={"calc(100vh - 70px)"}
            align={"center"}
            justify={"space-evenly"}
            bg={useColorModeValue("gray.50", "gray.800")}
            direction={{ base: 'column', md: 'row' }}
            >
                <Card
m={{ base: 4, md: 2 }}
                minH={{base: '70vh', md: '50vh', sm: 'auto'}}
                _hover={{
                    bg: useColorModeValue('#09356b'),
                    color: 'white',
                    transition: 'all 0.5s ease'
                }}>
                    <CardHeader>
                        <Heading size='md' textAlign={"center"}> Friday Membership</Heading>
                    </CardHeader>
                    <CardBody>
                        <List spacing={3}>
                        <ListItem>
                            <ListIcon as={MdAttachMoney} color='green.500' />
                            150 $
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdOutlineCalendarMonth} color='green.500' />
                            2023-09-01 To 2023-12-08
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdAlarm} color='green.500' />
                            21:00 - 23:00
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdLocationOn} color='green.500' />
                            255 Ontario St E, Montreal, Quebec H2X 1X6, 5th floor
                        </ListItem>
                        </List>
                    </CardBody>
                    <CardFooter justifyContent={"center"}>
                            <Button 
                                color={"white"} 
                                background={"rgba(9, 53, 107, 0.7)"}
                                cursor={"pointer"}
                                border={"2px solid white"}
                                _hover={{
                                        textDecoration: 'none',
                                        bg: 'white',
                                        color: '#09356b',
                                        transition: 'all 0.5s ease'
                                    }}>
                                Select Plan
                            </Button>   
                    </CardFooter>
                </Card>
                <Card
m={{ base: 4, md: 2 }}
                    minH={{base: '70vh', md: '50vh', sm: 'auto'}}
                    _hover={{
                    bg: useColorModeValue('#09356b'),
                    color: 'white',
                    transition: 'all 0.5s ease'
                }}>
                    <CardHeader>
                        <Heading size='md' textAlign={"center"}> Sunday Membership</Heading>
                    </CardHeader>
                    <CardBody>
                        <List spacing={3}>
                        <ListItem>
                            <ListIcon as={MdAttachMoney} color='green.500' />
                            150 $
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdOutlineCalendarMonth} color='green.500' />
                            2023-09-03 To 2023-12-10
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdAlarm} color='green.500' />
                            10:00 - 12:00
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdLocationOn} color='green.500' />
                            255 Ontario St E, Montreal, Quebec H2X 1X6, 5th floor
                        </ListItem>
                        </List>
                    </CardBody>
                    <CardFooter justifyContent={"center"}>
                            <Button 
                                color={"white"} 
                                background={"rgba(9, 53, 107, 0.7)"}
                                cursor={"pointer"}
                                border={"2px solid white"}
                                _hover={{
                                        textDecoration: 'none',
                                        bg: 'white',
                                        color: '#09356b',
                                        transition: 'all 0.5s ease'
                                    }}>
                                Select Plan
                            </Button>   
                    </CardFooter>
                </Card>
                <Card
m={{ base: 4, md: 2 }}
                minH={{base: '70vh', md: '50vh', sm: 'auto'}}
                _hover={{
                    bg: useColorModeValue('#09356b'),
                    color: 'white',
                    transition: 'all 0.5s ease'
                }}>
                    <CardHeader>
                        <Heading size='md' textAlign={"center"}> Drop In </Heading>
                    </CardHeader>
                    <CardBody>
                        <List spacing={3}>
                        <ListItem>
                            <ListIcon as={MdAttachMoney} color='green.500' />
                            15 $
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdLocationOn} color='green.500' />
                            255 Ontario St E, Montreal, Quebec H2X 1X6, 5th floor
                        </ListItem>
                        </List>
                    </CardBody>
                    <CardFooter justifyContent={"center"}>
                            <Button 
                                color={"white"} 
                                background={"rgba(9, 53, 107, 0.7)"}
                                cursor={"pointer"}
                                border={"2px solid white"}
                                _hover={{
                                        textDecoration: 'none',
                                        bg: 'white',
                                        color: '#09356b',
                                        transition: 'all 0.5s ease'
                                    }}>
                                Select Plan
                            </Button>   
                    </CardFooter>
                </Card>
                <Card
                m={{ base: 4, md: 2 }}
                    minH={{base: '70vh', md: '50vh', sm: 'auto'}}
                    _hover={{
                    bg: useColorModeValue('#09356b'),
                    color: 'white',
                    transition: 'all 0.5s ease'
                }}>
                    <CardHeader>
                        <Heading size='md' textAlign={"center"}> Kids Training Camp </Heading>
                    </CardHeader>
                    <CardBody>
                        <List spacing={3}>
                        <ListItem>
                            <ListIcon as={MdAttachMoney} color='green.500' />
                            650 $
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdOutlineCalendarMonth} color='green.500' />
                            2023-09-16 To 2024-05-11
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdAlarm} color='green.500' />
                            17:00 - 19:00
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdLocationOn} color='green.500' />
                            255 Ontario St E, Montreal, Quebec H2X 1X6, 5th floor
                        </ListItem>
                        </List>
                    </CardBody>
                    <CardFooter justifyContent={"center"}>
                            <Button 
                                color={"white"} 
                                background={"rgba(9, 53, 107, 0.7)"}
                                cursor={"pointer"}
                                border={"2px solid white"}
                                _hover={{
                                        textDecoration: 'none',
                                        bg: 'white',
                                        color: '#09356b',
                                        transition: 'all 0.5s ease'
                                    }}>
                                Select Plan
                            </Button>   
                    </CardFooter>
                </Card>
        </Flex>
    )
}
