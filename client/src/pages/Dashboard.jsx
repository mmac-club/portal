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

export default function Dashboard() {
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
        backgroundImage={"url('/team.jpeg')"} // Replace with the path to your image
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        filter={"blur(3px)"} // Adjust the blur intensity
        zIndex={-1}
      />

        {/* Your existing content */}
        {/* <Heading mb={10}>MMAC</Heading> */}
        {/* Add more content here */}
    </Flex>
  );
}
