// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   HStack,
//   InputRightElement,
//   Stack,
//   Button,
//   Heading,
//   Text,
//   useColorModeValue,
//   Select,
//   Checkbox
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { useAuth } from "../services/AuthService/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// export default function SignIn() {
//   const { login } = useAuth() // Ensure that useAuth() is providing the signup function
//   const navigate = useNavigate()
//   const [showPassword, setShowPassword] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({}); // State to hold validation errors
//   const [validationMessageErrors, setValidationMessageErrors] = useState({});
//   const messageError = {};

//   // const { signup, currentUser } = useAuth(); // Ensure that useAuth() is providing the signup function

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });

//   function handleInputChange(e) {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: value,
//     });
//         // Clear the validation error for this field when user starts typing again
//     setValidationErrors({
//       ...validationErrors,
//       [name]: "",
//     });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const { email, password } = user;
//     const errors = validateForm(user);
//     if (
//       Object.keys(errors).length > 0 ||
//       Object.keys(messageError).length > 0
//     ) {
//       // If there are validation errors, set them and prevent form submission
//       setValidationErrors(errors);
//       setValidationMessageErrors(messageError);
//       return;
//     }
//     setError("");
//     setLoading(true);
//     try {
//       await login(user)
//       navigate("/")
//     }
//     catch (error) {
//       messageError.fromFirebase = error
//       setValidationMessageErrors(messageError)
//       return;
//     }
//     setLoading(false);
//   }

//   function validateForm(user) {
//     const errors = {};

//     // Validate email
//     if (!user.email) {
//       errors.email = "Email is required";
//     }

//     // Validate password
//     if (!user.password) {
//       errors.password = "Password is required";
//     }
//     return errors;
//   }

//   return (
//     <Flex
//       height={"calc(100vh - 70px)"}
//       align={"center"}
//       justify={"center"}
//       bg={useColorModeValue("gray.50", "gray.800")}
//     >
//       <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//         <Stack align={"center"}>
//           <Heading fontSize={"4xl"} textAlign={"center"}>
//             Sign In
//           </Heading>
//         </Stack>
//         <Box
//           rounded={"lg"}
//           bg={useColorModeValue("white", "gray.700")}
//           boxShadow={"2xl"}
//           p={8}
//         >
//           {/* {JSON.stringify(currentUser)} */}
//           {/* Error box */}
//           {Object.keys(validationMessageErrors).length > 0 && (
//             <Box
//               bg="red.100" // Background color for the error box
//               p={2} // Padding for the error box
//               mb={2} // Margin bottom for spacing
//               borderRadius="md" // Rounded corners
//               display="flex"
//             >
//               <ul>
//                 {Object.keys(validationMessageErrors).map((fieldName) => (
//                   <li key={fieldName} style={{ marginLeft: "1rem" }}>
//                     {" "}
//                     {/* Add marginLeft here */}
//                     <Text color="red.500" fontSize="sm" fontWeight="semibold">
//                       {validationMessageErrors[fieldName]}
//                     </Text>
//                   </li>
//                 ))}
//               </ul>
//             </Box>
//           )}
//           <Stack spacing={4}>
//             <FormControl id="email" isRequired>
//               <FormLabel>Email address</FormLabel>
//               <Input
//                 type="email"
//                 name="email"
//                 value={user.email}
//                 onChange={handleInputChange}
//                 isInvalid={validationErrors.email}
//               />
//             </FormControl>
//             <FormControl id="password" isRequired>
//               <FormLabel>Password</FormLabel>
//               <InputGroup>
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={user.password}
//                   onChange={handleInputChange}
//                   isInvalid={validationErrors.password}
//                 />
//                 <InputRightElement h={"full"}>
//                   <Button
//                     variant={"ghost"}
//                     disabled
//                     onMouseDown={() => setShowPassword(true)}
//                     onMouseUp={() => setShowPassword(false)}
//                     onMouseLeave={() => setShowPassword(false)}
//                   >
//                     {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//                   </Button>
//                 </InputRightElement>
//               </InputGroup>
//             </FormControl>

//             <Stack spacing={7}>
//               <Button
//                 disabled={loading}
//                 loadingText="Submitting"
//                 size="lg"
//                 bg={"blue.400"}
//                 color={"white"}
//                 _hover={{
//                   bg: "blue.500",
//                 }}
//                 type="submit"
//                 onClick={handleSubmit}
//               >
//                 Log In
//               </Button>
//             </Stack>
//             <Stack pt={3}>
//               <Text align={"center"}>
//                 Need an Account? <Link to="/signup" style={{color: '#4299E1'}} >Sign Up</Link>
//               </Text>
//             </Stack>
//           </Stack>
//         </Box>
//       </Stack>
//     </Flex>
//   );
// }
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
                textAlign={"center"}
                fontWeight={"semibold"}
                fontSize={"3rem"}
              >
                Login
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
