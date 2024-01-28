import {React, useState, useEffect} from 'react'
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
    Card
  } from "@chakra-ui/react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [userStats, setUserStats] = useState({})

  useEffect(() => {
    /**
     * 
     * @todo: Fetch Data from API using fetch/axios and set the result into setUsers
     * 
     *  */ 

    setUsers([{
        email: "johndoe@gmail.com",
        age: 25,
        phone: "+1 514 123 1234",
        address: "160 Saint Mathieu, Montreal - H3H 2P4",
        created: "26-12-23",
        plan: "Summer",
        enrolled_on: "26-12-23",
        expire_on: "26-12-24",
        account_type: "Self",
        status: "active"
    },{
        email: "johndoe@gmail.com",
        age: 25,
        phone: "+1 514 123 1234",
        address: "160 Saint Mathieu, Montreal - H3H 2P4",
        created: "26-12-23",
        plan: "Summer",
        enrolled_on: "26-12-23",
        expire_on: "26-12-24",
        account_type: "Self",
        status: "active"
    },{
        email: "johndoe@gmail.com",
        age: 25,
        phone: "+1 514 123 1234",
        address: "160 Saint Mathieu, Montreal - H3H 2P4",
        created: "26-12-23",
        plan: "Summer",
        enrolled_on: "26-12-23",
        expire_on: "26-12-24",
        account_type: "Self",
        status: "inactive"
    }])
  }, [])

  useEffect(() => {
    let x = users.reduce((res, user) => {
        res[user.status] += 1
        res['total'] += 1
        return res;
    }, {
        "active": 0,
        "inactive": 0,
        "total": 0
    })
    setUserStats(x);
  }, [users])


  return (
    <>
        <Flex
        height={"calc(100vh - 70px)"}
        align={"center"}
        position={"relative"}
        overflow={"hidden"}
        padding={6}
        flexDirection={"column"}
        background={"#00000005"}
        >   
                
                <Flex
                    width={"100%"}
                    justifyContent={"space-between"}
                    mb={10}
                    gap={10}
                    
                >
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
                </Flex>

                
            
                <Table 
                    variant="striped"
                    background={"#ffffff"}
                    boxShadow={"0 0 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12)"}
                    >
                    <Thead>
                        <Tr textAlign={"center"}>
                            <Th>Email</Th>
                            <Th>Age</Th>
                            <Th>Phone Number</Th>
                            <Th>Address</Th>
                            <Th>Account Created</Th>
                            <Th>Current Plan</Th>
                            <Th>Enrolled Date</Th>
                            <Th>Expiry Date</Th>
                            <Th>Account Type</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            users.map((user, index) => {
                                return <tr key={index} style={{textAlign: "center"}}>
                                    <td style={{padding: "10px"}}>{user.email}</td>
                                    <td style={{padding: "10px"}}>{user.age}</td>
                                    <td style={{padding: "10px"}}>{user.phone}</td>
                                    <td style={{padding: "10px"}}>{user.address}</td>
                                    <td style={{padding: "10px"}}>{user.created}</td>
                                    <td style={{padding: "10px"}}>{user.plan}</td>
                                    <td style={{padding: "10px"}}>{user.enrolled_on}</td>
                                    <td style={{padding: "10px"}}>{user.expire_on}</td>
                                    <td style={{padding: "10px"}}>{user.account_type}</td>
                                    <td style={{padding: "10px"}}>
                                        <span className={`user-status user-status-${user.status}`}>
                                            {user.status}
                                        </span>     
                                    </td>
                                </tr>
                            })
                        }
                    </Tbody>
                </Table>
            

        </Flex>
    
    </>
  )
}

export default AdminDashboard