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
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
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
    } catch (error) {
      messageError.fromFirebase = error
      setValidationMessageErrors(messageError)
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
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={2} mx={"auto"} maxW={"lg"} py={8} px={1}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"2xl"}
          p={8}
        >
          {/* Error box */}
          {Object.keys(validationMessageErrors).length > 0 && (
            <Box
              bg="red.100" // Background color for the error box
              p={2} // Padding for the error box
              mb={2} // Margin bottom for spacing
              borderRadius="md" // Rounded corners
              display="flex"
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

          <Stack spacing={3}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                    isInvalid={validationErrors.firstName}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                    isInvalid={validationErrors.lastName}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                isInvalid={validationErrors.email || validationMessageErrors.email}
              />
            </FormControl>

            <HStack>
              {/* Add Date of birth */}
              <FormControl id="dateOfBirth" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  placeholder="yyyy/mm/dd"
                  name="dateOfBirth"
                  value={user.dateOfBirth}
                  onChange={handleInputChange}
                  isInvalid={validationErrors.dateOfBirth}
                />
              </FormControl>
              {/* Add Gender */}
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select your gender"
                  name="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl id="phoneNumber" isRequired>
                <FormLabel>Phone No.</FormLabel>
                <Input
                  type="tel"
                  placeholder="Select your gender"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleInputChange}
                  isInvalid={validationErrors.phoneNumber || validationMessageErrors.phoneNumber}
                />
              </FormControl>
              {/* Add Postal Code */}
              <FormControl id="postalCode" isRequired>
                <FormLabel>Postal Code</FormLabel>
                <Input
                  type="text"
                  placeholder="Select your gender"
                  name="postalCode"
                  value={user.postalCode}
                  onChange={handleInputChange}
                  isInvalid={validationErrors.postalCode || validationMessageErrors.postalCode}
                />
              </FormControl>
              {/* Add Phone Number */}
            </HStack>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  isInvalid={validationErrors.password || validationMessageErrors.password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
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

            <FormControl id="confirmPassword" isRequired>
              <HStack>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleInputChange}
                    isInvalid={validationErrors.confirmPassword || validationMessageErrors.confirmPassword}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      disabled
                      onMouseDown={() => setShowConfirmPassword(true)}
                      onMouseUp={() => setShowConfirmPassword(false)}
                      onMouseLeave={() => setShowConfirmPassword(false)}
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </HStack>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                disabled={loading}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
