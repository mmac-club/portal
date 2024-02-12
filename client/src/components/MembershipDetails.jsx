import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  Stack,
  VStack,
  useColorModeValue,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useAuth } from "../services/AuthService/AuthContext";
import { useState, useEffect } from "react";
import PaymentHandlerService from "../services/PaymentHandlerService/PaymentHandler";

const MembershipDetails = () => {
  const paymentHandlerService = new PaymentHandlerService();

  const { currentUser } = useAuth(); // Ensure that useAuth() is providing the currentUser
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(currentUser.uid);
        const response = await paymentHandlerService.get_membership_by_id(
          currentUser.uid
        );
        setUserData(response[0]);
        console.log(response[0]);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle error, e.g., show an error message to the user
      }
    };
    fetchUserDetails();
  }, [currentUser]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl" }}
          fontFamily={"Teimpos Headline"}
        >
          Membership Details
        </Heading>
        <FormControl id="membershipId">
          <HStack align={"left"}>
            <FormLabel fontWeight={"bold"}>Membership Id:</FormLabel>
            <Text>{userData.transactionId}</Text>
          </HStack>
        </FormControl>
        <FormControl>
          <HStack align={"left"}>
            <FormLabel fontWeight={"bold"}>Plan:</FormLabel>
            <Text>{userData.planType}</Text>
          </HStack>
        </FormControl>
        <FormControl>
          <HStack align={"left"}>
            <FormLabel fontWeight={"bold"}>Plan For:</FormLabel>
            <Text>{String(userData.planFor).toUpperCase()}</Text>
          </HStack>
        </FormControl>
        <FormControl>
          <HStack align={"left"}>
            <FormLabel fontWeight={"bold"}>Plan Bought</FormLabel>
            <Text>
              {new Date(userData.planStartDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
            </Text>
          </HStack>
          <HStack align={"left"}>
            <FormLabel fontWeight={"bold"}>Plan Expiry</FormLabel>
            <Text>
              {" "}
              {new Date(userData.planEndDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </Text>
          </HStack>{" "}
        </FormControl>
      </Stack>
    </Flex>
  );
};

export default MembershipDetails;
