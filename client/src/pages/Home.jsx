/* eslint-disable react/no-unescaped-entities */
// import { useAuth } from "../services/AuthService/AuthContext";
// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   HStack,
//   InputRightElement,
//   Stack,
//   Button,
//   Heading,
//   Text,
//   useColorModeValue,
//   Select,
//   Checkbox,
// } from "@chakra-ui/react";

// export default function Home() {
//   return (
//     <Flex
//       height={"calc(100vh - 70px)"}
//       align={"center"}
//       justify={"center"}
//       position={"relative"}
//       overflow={"hidden"}
//     >
//       <Box
//         position={"absolute"}
//         top={0}
//         left={0}
//         width={"100%"}
//         height={"100%"}
//         backgroundImage={"url('/MMAC_Dashboard.jpeg')"} // Replace with the path to your image
//         backgroundSize={"cover"}
//         backgroundPosition={"center"}
//         backgroundRepeat={"no-repeat"}
//         // filter={"blur(3px)"} // Adjust the blur intensity
//         zIndex={-1}
//       />

//         {/* Your existing content */}
//         {/* <Heading mb={10}>MMAC</Heading> */}
//         {/* Add more content here */}
//     </Flex>

//   );
// }

// "use client";

// import {
//   Button,
//   Checkbox,
//   Flex,
//   Text,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Stack,
//   Image,
// } from "@chakra-ui/react";

// export default function SplitScreen() {
//   return (
//     <Stack minH={"90vh"} direction={{ base: "column", md: "row" }}>
//       <Flex p={8} flex={1} align={"center"} justify={"flex-start"}>
//         <Stack spacing={4} w={"full"} maxW={"md"}>
//           <Heading fontFamily={'Teimpos Headline'} fontWeight={400} fontSize={"3.625rem"}>We're MMAC</Heading>
//         </Stack>
//       </Flex>
//       <Flex flex={1} align="center" justify="center">
//         <Image
//           alt={"Login Image"}
//           src={"././MMAC_Dashboard.jpeg"}
//           borderRadius={"2xl"} // Adjust the value as needed
//         />
//       </Flex>
//     </Stack>
//   );
// }

"use client";

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  useColorModeValue,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function CallToActionWithVideo() {
  const navigate = useNavigate();
  return (
    <Box bgGradient="linear-gradient(311deg, rgba(255,255,255,1) 0%, rgba(235,234,231,1) 28%);">
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
          minH={"80vh"}
        >
          <Flex alignItems="center" justify="center">
            <Divider borderColor="gray.500" flex="1" />
            <Box mx={4}>
              {" "}
              <Heading
                text="< my skills >"
                color1="#008080"
                color2="#90EE90"
                background="#000000"
              ></Heading>
            </Box>
            <Divider borderColor="gray.500" flex="1" />
          </Flex>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={300}
              letterSpacing={"-2px"}
              fontFamily={"Teimpos Headline"}
              fontSize={{ base: "3rem", sm: "4rem", lg: "4.625rem" }}
            >
              We're MMAC
            </Heading>
            <Box
              marginLeft={10}
              fontWeight={300}
              fontFamily={"Teimpos Headline Italics"}
              fontSize={{ base: "xl", sm: "2.625rem", lg: "3rem" }}
              lineHeight={1}
            >
              <Text as={"span"} position={"relative"} className="slide-up">
                All for One,
              </Text>
              <br />
              <Text
                marginLeft={108}
                as={"span"}
                color={"#913a86"}
                className="slide-down"
              >
                One for All
              </Text>
            </Box>
            <Stack
              direction={{ base: "column", md: "row" }}
              align={"center"}
              marginRight={{base:0, md:20}}
              justify={"center"}
              spacing={8}
            >
              <Button
                
                size={{base:"sm", md:"md", lg:"lg"}}
                w={"fit-content"}
                rounded={"full"}
                fontFamily={"Mordern Era"}
                fontSize={"lg"}
                bg={"#67295F"}
                color={"whiteAlpha.900"}
                _hover={{
                  color: "whiteAlpha.900",
                  bg: "#913a86",
                }}
                onClick={() => navigate("/about-us")} // Navigate to "/about-us" on click

              >
                About Us
              </Button>
              {/* <Button
                size={{base:"sm", md:"md", lg:"lg"}}
                w={"fit-content"}
                rounded={"full"}
                fontFamily={"Mordern Era"}
                fontSize={"lg"}
                bg={"blackAlpha.700"}
                color={"whiteAlpha.900"}
                _hover={{
                  color: "whiteAlpha.900",
                  bg: "blackAlpha.900",
                }}
              >
                Contact Us
              </Button> */}
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
            h={"auto"}
          >
            <Box
              position={"relative"}
              height={"300px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
              zIndex={1}
            >
              <Image
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={"./MMAC_Dashboard.jpeg"}
              />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}