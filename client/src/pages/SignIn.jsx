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
  Image
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../services/AuthService/AuthContext";
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
    if (
      Object.keys(errors).length > 0 ||
      Object.keys(messageError).length > 0
    ) {
      // If there are validation errors, set them and prevent form submission
      setValidationErrors(errors);
      setValidationMessageErrors(messageError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login(user)
      navigate("/")
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
    <Flex minH={"90vh"} align={"center"} justify={"center"}>
      <Stack direction={{ base: "column", md: "row" }}>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            rounded={"2xl"}
            src={"././streetguy.jpeg"}
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
                Log In
              </Heading>
            </Box>
            {/* {JSON.stringify(currentUser)} */}
            {/* Error box */}
            {Object.keys(validationMessageErrors).length > 0 && (
              <Box
                bg="red.100" // Background color for the error box
                p={2} // Padding for the error box
                mb={2} // Margin bottom for spacing
                borderRadius="2xl" // Rounded corners
                display="flex"
                variant='filled' 
                rounded="3xl"
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
                <FormLabel fontWeight="bold">Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  isInvalid={validationErrors.email}
                  fontSize={"sm"}
                  variant='filled' 
                  rounded="2xl"
                  size={"sm"}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel fontWeight="bold">Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    isInvalid={validationErrors.password}
                    fontSize={"sm"}
                    variant='filled' 
                    rounded="2xl"
                    size={"sm"}
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

              <Stack spacing={6}>
                <Button
                  disabled={loading}
                  loadingText="Submitting"
                  bg={"#67295F"}
                  color={"white"}
                  _hover={{
                    bg: "#4C1C46",
                  }}
                  variant='filled' 
                  rounded="3xl"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Log In
                </Button>
              </Stack>
              <Text align={"center"}>
                Need an Account?{" "}
                <Link to="/signup" style={{ color: "#67295F" }}>
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
}
