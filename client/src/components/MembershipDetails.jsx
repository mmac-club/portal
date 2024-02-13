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
import { useNavigate } from "react-router-dom";
import PaymentHandlerService from "../services/PaymentHandlerService/PaymentHandler";

const MembershipDetails = () => {
  const paymentHandlerService = new PaymentHandlerService();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Ensure that useAuth() is providing the currentUser
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await paymentHandlerService.get_membership_by_id(
          currentUser.uid
        );
        if (response[0] !== undefined){
            setUserData(response[0]);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle error, e.g., show an error message to the user
      }
    };
    fetchUserDetails();
  }, [currentUser]);

  async function buyMembership(){
    navigate("/league-registration")
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {userData.transactionId ? (
        // Render Membership Details box
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
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
      ) : (
        // Render Buy Membership Box
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
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
            Buy Membership Now
          </Heading>
          <Text>
            Please click the button below to purchase your membership.
          </Text>
          <Button onClick={buyMembership}>
            Buy Membership
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default MembershipDetails;
