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
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavLink = ({name, link}) => {
  console.log(name + " - " + link);
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('#09356b'),
      }}
      href={link}>
      {name}
    </Box>
  )
}

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
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
      console.log(error)
      setError("Failed to Logout")

    }
  }

  const Links = [
                    {link: "/Home", name: 'Home'},
                    {link: "/Registration", name: 'Registration'},
                    {link: "/About", name: 'About Us'},
                ]

  return (
    <>
      <Box bg={"#15539e"} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          <HStack spacing={8} alignItems={'center'}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }} fontSize={"16px"} color={'white'} fontWeight={'600'}>
              {Links.map((link) => (
                <NavLink key={link.name} {...link}></NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

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
                  <MenuItem >Account Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4} color={'white'}>
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
