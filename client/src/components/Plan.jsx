import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { CgDollar } from "react-icons/cg";

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
  color,
} from "@chakra-ui/react";

import {
  MdAlarm,
  MdLocationOn,
  MdOutlineCalendarMonth,
  MdAttachMoney,
} from "react-icons/md";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@chakra-ui/react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faDollarSign);

const Plan = ({
  index,
  type,
  price,
  time,
  date,
  address,
  onOpen,
  changePlan,
}) => {
  return (
    <Card
      m={{ base: 4, md: 2 }}
      border={"1px solid purple"}
      _hover={{
        transform: "scale(1.03)", // Increase the scale factor as needed
        transition: "transform 0.3s ease-in-out",
      }}
      bg={"purple.50"}
      rounded={"2xl"}
    >
      <CardHeader>
        <Heading
          style={{ color: "#1A1A1A" }}
          fontFamily={"Teimpos Headline"} // Set the font color here
          fontSize={"2rem"}
          fontWeight={300}
          textAlign={"center"}
        >
          {" "}
          {type}{" "}
        </Heading>
      </CardHeader>
      <CardBody>
        <List spacing={3}>
          <ListItem>
            <p className="price">
              <Icon as={FaDollarSign} boxSize={"10"} />
              {price}
            </p>
          </ListItem>
          <ListItem>
            <ListIcon as={MdOutlineCalendarMonth} color="green.500" />
            {date || "-"}
          </ListItem>
          <ListItem>
            <ListIcon as={MdAlarm} color="green.500" />
            {time || "-"}
          </ListItem>
          <ListItem>
            <ListIcon as={MdLocationOn} color="green.500" />
            {address}
          </ListItem>
        </List>
      </CardBody>
      <CardFooter justifyContent={"center"}>
        <Button
          color={"white"}
          background={"#67295F"}
          cursor={"pointer"}
          rounded={"3xl"}
          w={"full"}
        //   border={"2px solid #09356b"}
          _hover={{
            textDecoration: "none",
            bg: "#4C1C46",
            color: "white",
            transition: "all  ease",
          }}
          onClick={function (event) {
            onOpen();
            changePlan(index);
          }}
        >
          Get {type}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Plan;
