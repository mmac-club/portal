import React from 'react'
import { useAuth } from "../services/AuthService/AuthContext";
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
  Checkbox,
} from "@chakra-ui/react";

const About = () => {
  return (
    <Flex
      height={"calc(100vh - 70px)"}
      align={"center"}
      justify={"center"}
      position={"relative"}
      overflow={"hidden"}
    >
      <Box
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        
      />
        <h1>About</h1>
        {/* Your existing content */}
        {/* <Heading mb={10}>MMAC</Heading> */}
        {/* Add more content here */}
    </Flex>
  )
}

export default About