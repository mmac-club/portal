import React from "react";

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Box,
  Container,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

function AboutUs() {
  const [isImage1Hovered, setIsImage1Hovered] = useState(false);
  const [isImage2Hovered, setIsImage2Hovered] = useState(false);
  const [isImage3Hovered, setIsImage3Hovered] = useState(false);

  return (
    <Box
      bg={"blackAlpha.100"}
      bgGradient="linear-gradient(311deg, rgba(255,255,255,1) 0%, rgba(235,234,231,1) 28%);"
    >
      <Container maxW={"7xl"}>
        <Stack minH={"80vh"} direction={{ base: "column", md: "row" }}>
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={6} w={"full"} maxW={"lg"}>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                color={"blackAlpha.900"}
                lineHeight={1.5}
                fontFamily={"Mordern Era"}
                fontWeight={"semibold"}
              >
                作为蒙特利尔最有历史的华人篮球俱乐部MMAC
                万力体育会，成立于2002年，多年来我们一直认真致力于传播篮球文化力量，专注打造篮球分级课程，蒙城拥有四大校区，配置了篮球专业科班出身的教练‍，以及外籍顶尖篮球学校的教练团队，美式篮球专业训练教学体系。
                <br />
                <br />
                MMAC万力体育会提供包括青少年篮球训练、女生篮球班训练、公益性青少年篮球联赛、魁省青少年篮球巡回赛、蒙城成人篮球联赛、蒙城亚裔成人篮球联赛、寒暑假封闭式训练️、北美篮球邀请赛、渥太华篮球邀请赛🇨🇦、组建选拔队、篮球嘉年华、羽毛球排球训练以及梯队搭建等服务。
                <br />
                <br />
                我们MMAC作为华人社区榜样一直在倡导激发蒙城华裔青少年的发展潜力，引导他们朝着更积极的方向更广阔的平台发展。
              </Text>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Stack spacing={4} align={"center"} direction={{ base: "column", md: "column", lg:"row" }}>
              <VStack spacing={4}>
                <Image
                  src="/About-Us/about_1.jpg"
                  p={"5px"}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    transition: "transform 0.1s ease, box-shadow 0.1s ease", // Smooth transition for scale and shadow
                    transform: isImage1Hovered ? "scale(1.05)" : "scale(1)", // Scale up on hover
                    boxShadow: isImage1Hovered
                      ? "0px 0px 10px rgba(0, 0, 0, 0.3)"
                      : "none", // Shadow on hover
                  }}
                  onMouseEnter={() => setIsImage1Hovered(true)} // Set hover state to true on mouse enter
                  onMouseLeave={() => setIsImage1Hovered(false)} // Set hover state to false on mouse leave
                  w="100%"
                  h="auto"
                  objectFit="cover"
                />
                <Image
                  src="/About-Us/about_2.jpg"
                  p={"5px"}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    transition: "transform 0.1s ease, box-shadow 0.1s ease", // Smooth transition for scale and shadow
                    transform: isImage2Hovered ? "scale(1.05)" : "scale(1)", // Scale up on hover
                    boxShadow: isImage2Hovered
                      ? "0px 0px 10px rgba(0, 0, 0, 0.3)"
                      : "none", // Shadow on hover
                  }}
                  onMouseEnter={() => setIsImage2Hovered(true)} // Set hover state to true on mouse enter
                  onMouseLeave={() => setIsImage2Hovered(false)} // Set hover state to false on mouse leave
                  w="100%"
                  h="auto"
                  objectFit="cover"
                />
              </VStack>
              <Image
                alignSelf={"center"}
                src="/About-Us/about_3.jpg"
                p={"5px"}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  transition: "transform 0.1s ease, box-shadow 0.1s ease", // Smooth transition for scale and shadow
                  transform: isImage3Hovered ? "scale(1.05)" : "scale(1)", // Scale up on hover
                  boxShadow: isImage3Hovered
                    ? "0px 0px 10px rgba(0, 0, 0, 0.3)"
                    : "none", // Shadow on hover
                }}
                onMouseEnter={() => setIsImage3Hovered(true)} // Set hover state to true on mouse enter
                onMouseLeave={() => setIsImage3Hovered(false)} // Set hover state to false on mouse leave
                w={{base:"100%", md:"100%", lg:"50%"}}
                h="auto"
                objectFit="cover"
              />
            </Stack>
            {/* <Image
              alt={"Login Image"}
              objectFit={"cover"}
              src={
                "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
            /> */}
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

export default AboutUs;
