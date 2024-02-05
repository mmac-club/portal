import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  VStack,
  useColorModeValue,
  Select
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import UserManagementService from '../services/UserManagementService/UserManagement';
import { useAuth } from '../services/AuthService/AuthContext';

const AccountSetting = () => {
  const userManagementService = new UserManagementService();

  const { currentUser } = useAuth(); // Ensure that useAuth() is providing the currentUser
  const [userData, setUserData] = useState({});

  useEffect(() => {

    const fetchUserDetails = async () => {
      try {
        console.log(currentUser.uid)
        const response = await userManagementService.get_user_by_id(currentUser.uid);
        setUserData(response);
        console.log(response)
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <HStack>
            <VStack align={'left'}> 
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userData.firstName}
              />
            </VStack>
            <VStack align={"left"}>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userData.lastName}
              />
            </VStack>
          </HStack>
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            defaultValue={userData.email}
          />
        </FormControl>
        <FormControl id="Address">
          <HStack>
            <VStack align={'left'} > 
              <FormLabel>Date of Birth</FormLabel>
              <Input
                  type="date"
                  placeholder={formatDate(userData.dateOfBirth)}
                  name="dateOfBirth"
                />
            </VStack>
            <VStack align={"left"} flex={1}>
              <FormLabel>Gender</FormLabel>
              <Select
                placeholder={userData.gender}
                _placeholder={{ color: 'gray.500' }}
                name="gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </VStack>
          </HStack>
        </FormControl>
        <FormControl id="Address">
          <HStack>
            <VStack align={'left'}> 
              <FormLabel>Phone No.</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userData.phoneNumber}
              />
            </VStack>
            <VStack align={"left"}>
              <FormLabel>Postal Code</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userData.postalCode}
              />
            </VStack>
          </HStack>
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default AccountSetting;
