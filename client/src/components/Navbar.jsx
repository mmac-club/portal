import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "../services/AuthService/AuthContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userlogo from "/username.png";
import UserManagementService from "../services/UserManagementService/UserManagement";
import { ArrowForwardIcon, LockIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "@chakra-ui/react";

const NavLink = ({ name, link }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      background={"white"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("#67295F"),
        color: "white",
        transition: "all 0s ease",
      }}
      href={link}
    >
      {name}
    </Box>
  );
};

export default function Navbar() {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userManagementService = new UserManagementService();
  const [user, setUser] = useState({});
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Check if currentUser is not undefined
    if (currentUser) {
      const fetchUserDetails = async () => {
        try {
          // Assuming userManagementService.get_user_by_id returns a Promise
          const response = await userManagementService.get_user_by_id(
            currentUser.uid
          );
          setUser(response);
          setUserIsAdmin(response.isAdmin); // Update userIsAdmin based on fetched user details
        } catch (error) {
          console.error("Error fetching user details:", error);
          // Handle error, e.g., show an error message to the user
        }
      };

      // Call fetchUserDetails only when currentUser is defined
      fetchUserDetails();
    }
  }, [currentUser]);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      setError("Failed to Logout");
    }
  }

  async function handleSignUp() {
    try {
      navigate("/signup");
    } catch (error) {
      setError("Failed to Navigate");
    }
  }
  async function handleSignIn() {
    navigate("/signin");
  }

  async function handleAccountSettings() {
    navigate("/account-setting");
  }

  const Links = [
    { link: "/", name: "Home" },
    // { link: "/league-registration", name: "Membership" },
    // { link: "/about", name: "About Us" },
    { link: "/event-page", name: "Event" },
  ];

  const AdminLinks = [{ link: "/dashboard", name: "Dashboard" }];

  console.log(currentUser);
  return (
    <>
      <Box
        bg={"white"}
        px={4}
        height={"120px"}
        position={"sticky"}
        top={0}
        zIndex={999}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          height={"70px"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <HStack
              as={"nav"}
              spacing={4}
              fontSize={"16px"}
              color={"#67295F"}
              fontWeight={"600"}
            >
              {userIsAdmin
                ? AdminLinks.map((link) => (
                    <NavLink key={link.name} {...link}></NavLink>
                  ))
                : Links.map((link) => (
                    <NavLink key={link.name} {...link}></NavLink>
                  ))}
            </HStack>
          </HStack>
          <HStack
            position={"absolute"}
            left={"50%"}
            transform={"translateX(-50%)"}
          >
            <a href="/">
              <img src="/MMAC_HD_Logo.jpg" width={230}></img>
            </a>
          </HStack>
          {/* <Flex alignItems={"center"}> */}
            {/* <Stack direction={"row"} spacing={7}>
              {!currentUser ? (
                <>
                  <HStack
                    as={"nav"}
                    spacing={1}
                    fontSize={"16px"}
                    color={"#09356b"}
                    fontWeight={"600"}
                  >
                    {isSmallScreen ? (
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={<LockIcon />}
                          variant="outline"
                        />
                        <MenuList>
                          <MenuItem onClick={handleSignIn}>Log In</MenuItem>
                          <MenuItem
                            style={{ color: "#67295F" }}
                            onClick={handleSignUp}
                          >
                            Sign Up
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    ) : (
                      <>
                        <Text marginRight={"2"}>
                          <Link to="/signin" style={{ color: "#67295F" }}>
                            Log In
                          </Link>
                        </Text>
                        <Button
                          size={"sm"}
                          rounded={"md"}
                          background={"#67295F"}
                          onClick={handleSignUp}
                          color={"white"}
                          marginRight={3}
                          _hover={{
                            transform: "scale(1.05)", // Increase the scale factor as needed
                            transition: "transform 0.1s ease-in-out",
                          }}
                        >
                          Sign Up
                          <ArrowForwardIcon />
                        </Button>
                      </>
                    )}
                  </HStack>
                </>
              ) : (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={userlogo} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <>
                      <br />
                      <Center>
                        <Avatar size={"2xl"} src={userlogo} />
                      </Center>
                      <br />
                      <Center>
                        <Text>{currentUser.displayName}</Text>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem onClick={handleAccountSettings}>
                        Account Settings
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </>
                  </MenuList>
                </Menu>
              )}
            </Stack> */}
          {/* </Flex> */}
        </Flex>
        {isOpen ? (
          <Box
            pb={4}
            position={"relative"}
            zIndex={999}
            display={{ md: "none" }}
          >
            <Stack
              as={"nav"}
              spacing={4}
              boxShadow="sm"
              borderRadius={"md"}
              background={"white"}
              fontSize={"16px"}
              color={"#67295F"}
              fontWeight={"600"}
            >
              {Links.map((link) => (
                <NavLink key={link.name} {...link}></NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
