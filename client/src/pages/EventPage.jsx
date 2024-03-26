import React from 'react'
import { Flex, Box } from "@chakra-ui/react";

const EventPage = () => {
  return (
    <Flex
      height={"calc(100vh - 70px)"}
      align={"center"}
      justify={"center"}
      position={"relative"}
      overflow={"hidden"}
    >
      <Box
        position={"absolute"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        
      />
        <h1>Event</h1>
        {/* Your existing content */}
        {/* <Heading mb={10}>MMAC</Heading> */}
        {/* Add more content here */}
    </Flex>
  )
}

export default EventPage