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
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={300}
            fontFamily={"Teimpos Headline"}
            fontSize={{ base: "3xl", sm: "6xl", lg: "6xl" }}
          >
            We're MMAC
          </Heading>
          <Box
            marginLeft={10}
            fontWeight={300}
            fontFamily={"Teimpos Headline Italics"}
            fontSize={{ base: "xl", sm: "3xl", lg: "3xl" }}
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
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
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

const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
