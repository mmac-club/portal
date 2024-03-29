import { React, useState, useEffect } from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Box,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  Stack,
  HStack,
} from "@chakra-ui/react";
import UserManagementService from "../services/UserManagementService/UserManagement";
import PaymentHandlerService from "../services/PaymentHandlerService/PaymentHandler";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState({});
  const userManagementService = new UserManagementService();
  const paymentHandlerService = new PaymentHandlerService();

  //   useEffect(() => {
  //     /**
  //      *
  //      * @todo: Fetch Data from API using fetch/axios and set the result into setUsers
  //      *
  //      *  */
  //         setUsers([{
  //             email: "johndoe@gmail.com",
  //             age: 25,
  //             phone: "+1 514 123 1234",
  //             address: "160 Saint Mathieu, Montreal - H3H 2P4",
  //             created: "26-12-23",
  //             plan: "Summer",
  //             enrolled_on: "26-12-23",
  //             expire_on: "26-12-24",
  //             account_type: "Self",
  //             status: "active"
  //         },{
  //             email: "johndoe@gmail.com",
  //             age: 25,
  //             phone: "+1 514 123 1234",
  //             address: "160 Saint Mathieu, Montreal - H3H 2P4",
  //             created: "26-12-23",
  //             plan: "Summer",
  //             enrolled_on: "26-12-23",
  //             expire_on: "26-12-24",
  //             account_type: "Self",
  //             status: "active"
  //         },{
  //             email: "johndoe@gmail.com",
  //             age: 25,
  //             phone: "+1 514 123 1234",
  //             address: "160 Saint Mathieu, Montreal - H3H 2P4",
  //             created: "26-12-23",
  //             plan: "Summer",
  //             enrolled_on: "26-12-23",
  //             expire_on: "26-12-24",
  //             account_type: "Self",
  //             status: "inactive"
  //         }])
  //     }, [])

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await userManagementService.get_all_users();
        console.log(response);
        setUsers(response);

        const membership_response = await paymentHandlerService.get_all_membership();
        const updatedUsers = response.map((user) => {
            const membershipData = membership_response.find((membership) => membership.uid === user.firebase_uid);
  
            // If membershipData exists, unpack and add membership details to user object, else set to 'N/A'
            if (membershipData) {
              user = {
                ...user,
                currentPlan: membershipData.planType,
                enrolledDate: membershipData.planStartDate,
                expiryDate: membershipData.planEndDate,
              };
            }
            return user;
          });
          console.log(membership_response)
          setUsers(updatedUsers)

        // Calculate user statistics
        let x = updatedUsers.reduce(
          (res, user) => {
            res["total"] += 1;
            console.log(user)
            if (user.currentPlan) {
              res["active"] += 1;
            } else {
              res["inactive"] += 1;
            }
            return res;
          },
          {
            active: 0,
            inactive: 0,
            total: 0,
          }
        );

        setUserStats(x);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchUserDetails();
  }, []); // empty dependency array to run once on mount

  return (
    <Flex
      align={"left"}
      position={"absolute"}
      //   overflow={"hidden"}
      padding={6}
      flexDirection={"column"}
      background={"#00000005"}
    >
      <Stack>
        <HStack>
          <Stat
            padding={5}
            borderRadius={3}
            background={"#ffffff"}
            boxShadow={"0 0 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12)"}
          >
            <StatLabel>Total Users</StatLabel>
            <StatNumber>{userStats.total || 0}</StatNumber>
          </Stat>

          <Stat
            padding={5}
            borderRadius={3}
            background={"#ffffff"}
            boxShadow={"0 0 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12)"}
          >
            <StatLabel>Subscribed Users</StatLabel>
            <StatNumber>{userStats.active || 0}</StatNumber>
          </Stat>

          <Stat
            padding={5}
            borderRadius={3}
            background={"#ffffff"}
            boxShadow={"0 0 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12)"}
          >
            <StatLabel fontSize={"1rem"}>Total Inactive</StatLabel>
            <StatNumber>{userStats.inactive || 0}</StatNumber>
          </Stat>
        </HStack>
        <Table
          variant="striped"
          background={"#ffffff"}
          boxShadow={"0 0 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12)"}
        >
          <Thead>
            <Tr textAlign={"center"}>
              <Th>Email</Th>
              <Th>DOB</Th>
              <Th>Phone Number</Th>
              <Th>Address</Th>
              <Th>Account Created</Th>
              <Th>Current Plan</Th>
              <Th>Enrolled Date</Th>
              <Th>Expiry Date</Th>
            </Tr>
          </Thead>
          <Tbody textAlign={"left"}>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td style={{ padding: "10px" }}>{user.email}</td>
                  <td style={{ padding: "10px" }}>
                    {new Date(user.dateOfBirth).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}
                  </td>
                  <td style={{ padding: "10px" }}>{user.phoneNumber}</td>
                  <td style={{ padding: "10px" }}>{user.postalCode}</td>
                  <td style={{ padding: "10px" }}>{user.createdAt}</td>
                  <td style={{ padding: "10px" }}>{user.currentPlan || "N/A"}</td>
                  <td style={{ padding: "10px" }}>{user.enrolledDate || "N/A"}</td>
                  <td style={{ padding: "10px" }}>{user.expiryDate || "N/A"}</td>
                </tr>
              );
            })}
          </Tbody>
        </Table>
      </Stack>
    </Flex>
  );
};

export default AdminDashboard;
