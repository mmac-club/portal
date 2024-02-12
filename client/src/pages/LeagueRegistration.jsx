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
  GridItem,
} from "@chakra-ui/react";
import { useState } from "react";

import PaymentHandler from "../components/PaymentHandler";
import Plan from "../components/Plan";
import PaymentConfirmation from "./PaymentConfirmation";

export default function LeagueRegistration() {
  const plans = [
    {
      type: "Friday Season Pass",
      price: "150",
      time: "21:00 - 23:00",
      date: "2024-01-12 To 2024-05-03",
      address:
        "Cegep di Vieux Montreal 5th floor - 255 Ontario St E, Montreal, Quebec H2X 1X6",
    },
    {
      type: "Sunday Season Pass",
      price: "150",
      time: "10:00 - 12:00",
      date: "2024-01-14 To 2024-05-05",
      address:
        "Cegep di Vieux Montreal 5th floor - 255 Ontario St E, Montreal, Quebec H2X 1X6",
    },
    {
      type: "Drop-In Sunday",
      price: "15",
      time: "10:00 - 12:00",
      date: "2024-01-14 To 2024-05-05 (Any one Sunday)",
      address:
        "Cegep di Vieux Montreal 5th floor - 255 Ontario St E, Montreal, Quebec H2X 1X6",
    },
    {
      type: "Drop-In Friday",
      price: "15",
      time: "10:00 - 12:00",
      date: "2024-01-14 To 2024-05-05 (Any one Friday)",
      address:
        "Cegep di Vieux Montreal 5th floor - 255 Ontario St E, Montreal, Quebec H2X 1X6",
    },
    {
      type: "Kids Training Camp",
      price: "650",
      time: "17:00 - 19:00",
      date: "2023-09-16 To 2024-05-11",
      address:
        "Cegep di Vieux Montreal 5th floor - 255 Ontario St E, Montreal, Quebec H2X 1X6",
    },
  ];

  const paymentModal = useDisclosure();
  const paymentResponseModal = useDisclosure();
  const [selectedPlan, setPlanValue] = useState(0);
  const [paymentResonse, setPaymentResponse] = useState("");
  const [planFor, setPlanFor] = useState("");

  const changePlan = (planIndex) => {
    console.log(planIndex);
    setPlanValue(planIndex);
  };

  const changePaymentResponse = (status) => {
    setPaymentResponse(status);
    paymentResponseModal.onOpen();
  };

  const changePlanFor = (e) => {
    console.log(e.target.value);
    setPlanFor(e.target.value);
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={paymentModal.isOpen}
        onClose={paymentModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={"medium"} fontFamily={"Teimpos Headline"}>
            Selected Plan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer mb={"50px"} overflow={"hidden"}>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td fontWeight={"bold"}>Plan Type</Td>
                    <Td>{plans[selectedPlan] && plans[selectedPlan].type}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"bold"}>Price</Td>
                    <Td>${plans[selectedPlan] && plans[selectedPlan].price}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"bold"}>Date</Td>
                    <Td>{plans[selectedPlan] && plans[selectedPlan].date}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"bold"}>Time</Td>
                    <Td>{plans[selectedPlan] && plans[selectedPlan].time}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"bold"}>Plan For</Td>
                    <Td>
                      <Select
                        name="planType"
                        value={planFor}
                        onChange={changePlanFor}
                        required
                      >
                        <option value="">Select Plan</option>
                        <option value="self">Self</option>
                        <option value="Kid">Kid</option>
                      </Select>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            {planFor ? (
              <PaymentHandler
                amount={plans[selectedPlan].price}
                selectedPlan={selectedPlan}
                planFor={planFor}
                onClose={paymentModal.onClose}
                openPaymentResponseModal={changePaymentResponse}
              />
            ) : (
              ""
            )}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        closeOnOverlayClick={false}
        isOpen={paymentResponseModal.isOpen}
        onClose={paymentResponseModal.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW={{ base: "90%", lg: "60%" }}>
          <ModalCloseButton />
          <ModalBody>
            <PaymentConfirmation status={paymentResonse} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Flex justify={"center"} align={"center"} minH={"90vh"}>
        <Stack>
          <Box
            // boxShadow={"2xl"}
            rounded={"3xl"}
            overflow={"hidden"}
            margin={8}
            borderBottom={"8px"}
            borderLeft={"4px"}
            bg={"purple.100"}
          >
            <Heading
              p={4}
              align={"center"}
              fontSize={"3rem"}
              fontWeight={"semi-bold"}
              fontFamily={"Teimpos Headline"}
            >
              MMAC Recreational Basketball 2024 Winter
            </Heading>
          </Box>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacingX="40px"
            spacingY="20px"
            padding="20px"
            // direction={{ base: 'column', md: 'row' }}
          >
            {plans.map((plan, index) => {
              return (
                <Plan
                  key={index}
                  index={index}
                  {...plan}
                  onOpen={paymentModal.onOpen}
                  changePlan={changePlan}
                />
              );
            })}
          </SimpleGrid>
        </Stack>
      </Flex>
    </>
  );
}
