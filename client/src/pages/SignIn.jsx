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
  Checkbox
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const { login } = useAuth() // Ensure that useAuth() is providing the signup function
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); // State to hold validation errors
  const [validationMessageErrors, setValidationMessageErrors] = useState({});
  const messageError = {};

  // const { signup, currentUser } = useAuth(); // Ensure that useAuth() is providing the signup function

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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
    const { email, password } = user;
    const errors = validateForm(user);
    console.log(errors)
    if (
      Object.keys(errors).length > 0 ||
      Object.keys(messageError).length > 0
    ) {
      // If there are validation errors, set them and prevent form submission
      setValidationErrors(errors);
      console.log(validationErrors)
      setValidationMessageErrors(messageError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login(user)
      navigate("/")
      console.log("User login successful");
    } 
    catch (error) {
      messageError.fromFirebase = error
      setValidationMessageErrors(messageError)
      return;
    }
    setLoading(false);
  }

  function validateForm(user) {
    const errors = {};

    // Validate email
    if (!user.email) {
      errors.email = "Email is required";
    }

    // Validate password
    if (!user.password) {
      errors.password = "Password is required";
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
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign In
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"2xl"}
          p={8}
        >
          {/* {JSON.stringify(currentUser)} */}
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
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                isInvalid={validationErrors.email}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  isInvalid={validationErrors.password}
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

            <Stack spacing={7}>
              {/* <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox marginRight={5}>Remember me</Checkbox>
                <Text marginLeft={5} color={"blue.400"}>Forgot password?</Text>
              </Stack> */}
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
                Log In
              </Button>
            </Stack>
            <Stack pt={3}>
              <Text align={"center"}>
                Need an Account? <Link to="/signup" style={{color: '#4299E1'}} >Sign Up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
