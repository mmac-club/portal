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
import { useAuth, googleAuthenicator, facebookAuthenticator } from "../contexts/AuthContext";
import { FaGoogle, FaFacebook } from 'react-icons/fa';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  function handleInputChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }
  // async function getCurrentUser() {
  //   // Replace this with your logic to get the current user from your authentication system
  //   // For example, using Firebase Authentication: firebase.auth().currentUser
  //   // Make sure to handle user authentication in your app properly.
  //   return { uid: "sampleUserId" }; // Replace with your actual user data
  // }

  // This is a sample function to create a user profile in Firebase (replace with your Firebase logic)
  async function createProfile(user, userData) {
    // Replace this with your logic to create a user profile in Firebase Realtime Database or Firestore
    // Example using Firebase Realtime Database:
    // const userProfileRef = firebase.database().ref('users/' + user.uid);
    // await userProfileRef.set(userData);

    // Example using Firebase Firestore:
    // const userProfileRef = firebase.firestore().collection('users').doc(user.uid);
    // await userProfileRef.set(userData);

    console.log("User profile created");
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
    setError("THis is error");
    setLoading(true);
    try {
      console.log("user:", user);
      await signup(
        user.email,
        user.password
      );
      // After the user signs up, get the current user
      // const user = await getCurrentUser();

      // Create a user profile in Firebase with the collected phone number
      await createProfile(user, {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phoneNumber,
      });
      console.log("User created");
    } catch (error) {
      console.log("Error" + error);
    }
    setLoading(false);
  }

  const handleGoogelSignin = async () => {
    console.log("Singing In with Google");
    await googleAuthenicator();
  }

  const handleFacebookSignin = async () => {
    console.log("Singing in with Facebook");
    await facebookAuthenticator();
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
          {JSON.stringify(currentUser)}
          {/* Error box */}
          {error && (
            <Box
              bg="red.100" // Background color for the error box
              p={2} // Padding for the error box
              mb={2} // Margin bottom for spacing
              borderRadius="md" // Rounded corners
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text color="red.500" fontSize="md" fontWeight={"semibold"}>
                {error}
              </Text>
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
            <HStack spacing={10} pt={2}>
              <Button
                onClick={handleGoogelSignin}
                leftIcon={<FaGoogle />}
                colorScheme="red"
                variant="outline"
                size="md"
                fontWeight="medium"
                borderRadius="full"
                _hover={{ bg: 'red.500', color: 'white' }}
              >
                Sign in with Google
              </Button>
              <Button
                onClick={handleFacebookSignin}
                leftIcon={<FaFacebook />}
                colorScheme="blue"
                variant="outline"
                size="md"
                fontWeight="medium"
                borderRadius="full"
                _hover={{ bg: 'blue.500', color: 'white' }}
              >
                Sign in with Facebook
              </Button>
            </HStack>
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
