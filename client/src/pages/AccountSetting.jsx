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
  Select,
  FormErrorMessage
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import UserManagementService from '../services/UserManagementService/UserManagement';
import { useAuth } from '../services/AuthService/AuthContext';

const AccountSetting = () => {
  const userManagementService = new UserManagementService();

  const { currentUser } = useAuth(); // Ensure that useAuth() is providing the currentUser
  const [userData, setUserData] = useState({});
  const [editableData, setEditableData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); // State to track validation errors

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(currentUser.uid)
        const response = await userManagementService.get_user_by_id(currentUser.uid);
        setUserData(response);
        setEditableData(response);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error, e.g., show an error message to the user
      }
    };
    fetchUserDetails();
  }, [currentUser]);

  const handleInputChange = (field, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    // Clear validation error for the field when the user starts typing
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };
  
  const validateFields = () => {
    const errors = {};

    // Validate first name (add your custom conditions)
    if (!editableData.firstName) {
      errors.firstName = "First name is required";
    }

    // Validate last name (add your custom conditions)
    if (!editableData.lastName) {
      errors.lastName = "Last name is required";
    }

    // Validate email
    if (!editableData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(editableData.email)) {
      errors.email = "Email is invalid";
    }

    // ... (repeat for other fields)
    // Validate dateOfBirth (you can add more specific validation as needed)
    if (!editableData.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    // Validate phoneNumber
    if (!editableData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(editableData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
    }

    // Validate postalCode
    if (!editableData.postalCode) {
      errors.postalCode = "Postal code is required";
    } else if (!/^[a-zA-Z0-9]{6}$/.test(editableData.postalCode)) {
      errors.postalCode = "Postal code must be 6 characters alphanumeric";
    }
    return errors;
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setValidationErrors({}); // Clear validation errors when entering/exiting edit mode
  };

  const handleSubmit = async () => {
    const errors = validateFields();

    if (Object.keys(errors).length === 0) {
      try {
        console.log(currentUser.uid)
        console.log(editableData)
        await userManagementService.update_user(currentUser.uid, editableData);
        console.log('User information updated successfully!');
        setUserData(editableData);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating user information:', error);
      }
    } else {
      setValidationErrors(errors);
      console.error('Validation errors:', errors);
    }
  };
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
                isDisabled={!isEditing}
                value={isEditing ? editableData.firstName : userData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                isInvalid={!!validationErrors.firstName}
              />
              <FormErrorMessage>{validationErrors.firstName}</FormErrorMessage>
            </VStack>
            <VStack align={"left"}>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={isEditing ? editableData.lastName : userData.lastName}
                isDisabled={!isEditing}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                isInvalid={!!validationErrors.lastName}      
              />
              <FormErrorMessage>{validationErrors.lastName}</FormErrorMessage>
            </VStack>
          </HStack>
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={isEditing ? editableData.email : userData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            isDisabled={!isEditing}
            isInvalid={!!validationErrors.lastName} 
          />
          <FormErrorMessage>{validationErrors.email}</FormErrorMessage>
        </FormControl>
        <FormControl id="Address">
          <HStack>
            <VStack align={'left'} > 
              <FormLabel>Date of Birth</FormLabel>
              <Input
                  type="date"
                  placeholder={formatDate(userData.dateOfBirth)}
                  name="dateOfBirth"
                  value={isEditing ? editableData.dateOfBirth: userData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  isDisabled={!isEditing}
                  isInvalid={!!validationErrors.dateOfBirth} 
                />
                <FormErrorMessage>{validationErrors.dateOfBirth}</FormErrorMessage>
            </VStack>
            <VStack align={"left"} flex={1}>
              <FormLabel>Gender</FormLabel>
              <Select
                placeholder={userData.gender}
                _placeholder={{ color: 'gray.500' }}
                name="gender"
                value={isEditing ? editableData.gender : userData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                isDisabled={!isEditing}
                isInvalid={!!validationErrors.gender} 
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
              <FormErrorMessage>{validationErrors.gender}</FormErrorMessage>
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
                value={isEditing ? editableData.phoneNumber : userData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                isDisabled={!isEditing}
                isInvalid={!!validationErrors.phoneNumber} 
              />
              <FormErrorMessage>{validationErrors.phoneNumber}</FormErrorMessage>
            </VStack>
            <VStack align={"left"}>
              <FormLabel>Postal Code</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={isEditing ? editableData.postalCode : userData.postalCode}
                isDisabled={!isEditing}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                isInvalid={!!validationErrors.postalCode} 
              />
              <FormErrorMessage>{validationErrors.postalCode}</FormErrorMessage>
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
            }}
            onClick={handleEditToggle}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          {isEditing && (
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default AccountSetting;
