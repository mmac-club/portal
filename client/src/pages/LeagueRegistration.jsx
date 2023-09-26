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
    Select,
    Radio,
    RadioGroup,
  } from "@chakra-ui/react";

export default function LeagueRegistration() {
    return (
        <Flex
            minH={"calc(100vh - 70px)"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
            >
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                <Card>
                    <CardHeader>
                    <Heading size='md'> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                    <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                    <Button>View here</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                    <Heading size='md'> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                    <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                    <Button>View here</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                    <Heading size='md'> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                    <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                    <Button>View here</Button>
                    </CardFooter>
                </Card>
                </SimpleGrid>
        </Flex>
    )
}
