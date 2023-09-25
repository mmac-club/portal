export default function LeagueRegistration() {
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
                    Registration Form
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
                <Stack spacing={4}>
                    <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
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
                </Stack>
                </Box>
            </Stack>
            </Flex>
    )
}
