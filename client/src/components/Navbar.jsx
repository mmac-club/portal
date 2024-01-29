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
  useColorMode,
  IconButton,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useAuth } from '../services/AuthService/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavLink = ({name, link}) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      background={'white'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('#09356b'),
        color: 'white',
        transition: 'all 0.5s ease'
      }}
      href={link}>
      {name}
    </Box>
  )
}

export default function Navbar() {
  
  const { logout } = useAuth()
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure()

  async function handleLogout() {
    setError("")
    try{
      await logout()
      navigate("/signin")

    }catch(error){
      setError("Failed to Logout")
    }
  }

  async function handleAccountSettings() {
      navigate("/account-setting")
  }

  const Links = [
                    {link: "/", name: 'Home'},
                    {link: "/league-registration", name: 'Registration'},
                    {link: "/about", name: 'About Us'}
                ]

  return (
    <>
      <Box bg={"white"} px={4} height={"70px"} position={'sticky'} top={0} zIndex={999}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} height={"70px"}>
          <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          <HStack spacing={8} alignItems={'center'} display={{ base: 'none', md: 'flex' }} >
            <HStack as={'nav'} spacing={4} fontSize={"16px"} color={'#09356b'} fontWeight={'600'}>
              {Links.map((link) => (
                <NavLink key={link.name} {...link}></NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack position={'absolute'} left={'50%'} transform={'translateX(-50%)'}>
            <a href='/'><img src='/logo.png' width={200}></img></a>
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem >Your Servers</MenuItem>
                  <MenuItem onClick={handleAccountSettings}>Account Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} position={'relative'} zIndex={999} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4} boxShadow='sm' borderRadius={'md'} background={'white'} fontSize={"16px"} color={'#09356b'} fontWeight={'600'}>
              {Links.map((link) => (
                <NavLink key={link.name} {...link}></NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
