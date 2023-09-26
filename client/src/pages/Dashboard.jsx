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
    Select,
    Checkbox
  } from "@chakra-ui/react";

export default function Dashboard() {
    return (
        <Flex
      height={"calc(100vh - 70px)"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
        >
            Dashboard
        </Flex>
    )
}
