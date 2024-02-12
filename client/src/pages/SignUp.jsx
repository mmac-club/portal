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
  Select,
  Checkbox,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../services/AuthService/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const messageError = {};

  const { signup, currentUser } = useAuth(); // Ensure that useAuth() is providing the signup function

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    postalCode: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({}); // State to hold validation errors
  const [validationMessageErrors, setValidationMessageErrors] = useState({});

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    // Clear the validation error for this field when user starts typing again
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phoneNumber,
      postalCode,
      confirmPassword,
    } = user;
    // Validate the form before submitting
    const errors = validateForm(user);
    if (
      Object.keys(errors).length > 0 ||
      Object.keys(messageError).length > 0
    ) {
      // If there are validation errors, set them and prevent form submission
      setValidationErrors(errors);
      setValidationMessageErrors(messageError);
      return;
    }

    setError(""); // Clear any previous errors
    setLoading(true);

    try {
      await signup(user);
      navigate("/");
    } catch (error) {
      messageError.fromFirebase = error;
      setValidationMessageErrors(messageError);
      return;
    }
    setLoading(false);
  }

  function validateForm(user) {
    const errors = {};

    // Validate firstName
    if (!user.firstName) {
      errors.firstName = "First name is required";
    }

    // Validate lastName
    if (!user.lastName) {
      errors.lastName = "Last name is required";
    }

    // Validate email
    if (!user.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      messageError.email = "Email is invalid";
    }

    // Validate password
    if (!user.password) {
      errors.password = "Password is required";
    } else if (
      !(
        user.password.length >= 8 &&
        /[A-Z]/.test(user.password) &&
        /[a-z]/.test(user.password) &&
        /\d/.test(user.password) &&
        /[^a-zA-Z\d]/.test(user.password)
      )
    ) {
      messageError.password =
        "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character";
    }

    // Validate dateOfBirth (you can add more specific validation as needed)
    if (!user.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    // Validate phoneNumber
    if (!user.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(user.phoneNumber)) {
      messageError.phoneNumber = "Phone number must be 10 digits";
    }

    // Validate postalCode
    if (!user.postalCode) {
      errors.postalCode = "Postal code is required";
    } else if (!/^[a-zA-Z0-9]{6}$/.test(user.postalCode)) {
      messageError.postalCode = "Postal code must be 6 characters alphanumeric";
    }

    // Validate confirmPassword
    if (!user.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (user.confirmPassword !== user.password) {
      messageError.confirmPassword = "Passwords do not match";
    }

    return errors;
  }

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      maxH="100vh"
      overflowY="auto"
    >
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          rounded={"2xl"}
          src={"././illustration-2.jpeg"}
        />
      </Flex>
      <Flex p={5} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} h={"full"} w={"full"} maxW={"xl"}>
          <Box borderRadius={"md"}>
            <Heading
              fontFamily={'Teimpos Headline'}
              textAlign={"center"}
              fontWeight={300}
              fontSize={"3rem"}
            >
              Sign Up
            </Heading>
          </Box>
          {Object.keys(validationMessageErrors).length > 0 && (
            <Box
              bg="red.100" // Background color for the error box
              p={2} // Padding for the error box
              mb={2} // Margin bottom for spacing
              borderRadius="md" // Rounded corners
              display="flex"
              rounded={"3xl"}
            >
              <ul>
                {Object.keys(validationMessageErrors).map((fieldName) => (
                  <li key={fieldName} style={{ marginLeft: "1rem" }}>
                    {" "}
                    {/* Add marginLeft here */}
                    <Text color="red.500" fontSize="sm" fontWeight="semibold">
                      {validationMessageErrors[fieldName]}
                    </Text>
                  </li>
                ))}
              </ul>
            </Box>
          )}
          <HStack>
            <FormControl id="firstName" isRequired>
              <FormLabel fontWeight="bold">First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                variant='filled' 
                rounded="2xl"
                value={user.firstName}
                onChange={handleInputChange}
                isInvalid={validationErrors.firstName}
                fontSize="sm" // Add this line to set the font size to large
                size="sm" // Add this line to set the size to medium
              />
            </FormControl>

            <FormControl id="lastName">
              <FormLabel fontWeight="bold">Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                variant='filled' 
                rounded="2xl"
                value={user.lastName}
                onChange={handleInputChange}
                isInvalid={validationErrors.lastName}
                fontSize="sm" // Add this line to set the font size to large
                size="sm" // Add this line to set the size to medium
              />
            </FormControl>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel fontWeight="bold">Email address</FormLabel>
            <Input
              type="email"
              name="email"
              variant='filled' 
              rounded="2xl"
              value={user.email}
              onChange={handleInputChange}
              fontSize="sm" // Add this line to set the font size to large
              size="sm" // Add this line to set the size to medium
              isInvalid={
                validationErrors.email || validationMessageErrors.email
              }
            />
          </FormControl>
          <HStack>
            {/* Add Date of birth */}
            <FormControl id="dateOfBirth" isRequired>
              <FormLabel fontWeight="bold">Date of Birth</FormLabel>
              <Input
                type="date"
                name="dateOfBirth"
                variant='filled' 
                rounded="2xl"
                value={user.dateOfBirth}
                onChange={handleInputChange}
                fontSize="sm" // Add this line to set the font size to large
                size="sm" // Add this line to set the size to medium
                isInvalid={validationErrors.dateOfBirth}
              />
            </FormControl>
            {/* Add Gender */}
            <FormControl id="gender" isRequired>
              <FormLabel fontWeight="bold">Gender</FormLabel>
              <Select
                placeholder="Select your gender"
                name="gender"
                variant='filled' 
                rounded="2xl"
                value={user.gender}
                onChange={handleInputChange}
                fontSize="sm" // Add this line to set the font size to large
                size="sm" // Add this line to set the size to medium
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
          </HStack>
          <HStack>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel fontWeight="bold">Phone No.</FormLabel>
              <Input
                type="tel"
                placeholder="Enter Phone Number"
                variant='filled' 
                rounded="2xl"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputChange}
                fontSize="sm" // Add this line to set the font size to large
                size="sm" // Add this line to set the size to medium
                isInvalid={
                  validationErrors.phoneNumber ||
                  validationMessageErrors.phoneNumber
                }
              />
            </FormControl>
            {/* Add Postal Code */}
            <FormControl id="postalCode" isRequired>
              <FormLabel fontWeight="bold">Postal Code</FormLabel>
              <Input
                type="text"
                placeholder="6 Digit Postal Code"
                name="postalCode"
                variant='filled' 
                rounded="2xl"
                value={user.postalCode}
                onChange={handleInputChange}
                fontSize="sm" // Add this line to set the font size to large
                size="sm" // Add this line to set the size to medium
                isInvalid={
                  validationErrors.postalCode ||
                  validationMessageErrors.postalCode
                }
              />
            </FormControl>
            {/* Add Phone Number */}
          </HStack>
          <FormControl id="password" isRequired>
            <FormLabel fontWeight="bold">Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                variant='filled' 
                rounded="2xl"
                value={user.password}
                onChange={handleInputChange}
                fontSize="sm" // Add this line to set the font size to large
                size="sm" // Add this line to set the size to medium
                isInvalid={
                  validationErrors.password || validationMessageErrors.password
                }
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"filled"}
                  disabled
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel fontWeight="bold">Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                variant='filled' 
                rounded="2xl"
                value={user.confirmPassword}
                onChange={handleInputChange}
                fontSize="sm" // Add this line to set the font size to large
                size="sm" // Add this line to set the size to medium
                isInvalid={
                  validationErrors.confirmPassword ||
                  validationMessageErrors.confirmPassword
                }
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"filled"}
                  disabled
                  onMouseDown={() => setShowConfirmPassword(true)}
                  onMouseUp={() => setShowConfirmPassword(false)}
                  onMouseLeave={() => setShowConfirmPassword(false)}
                >
                  {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            {/* <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={"blue.500"}>Forgot password?</Text>
            </Stack> */}
            <Button
              disabled={loading}
              loadingText="Submitting"
              bg={"#67295F"}
              color={"white"}
              variant='filled' 
              rounded="3xl"
              _hover={{
                bg: "#4C1C46",
              }}
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Text align={"center"}>
              Already a user?{" "}
              <Link to="/signin" style={{ color: "#67295F" }}>
                Log In
              </Link>{" "}
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
