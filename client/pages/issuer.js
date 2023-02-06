import React, { useContext } from "react";
import { IShareContext } from "../context/IShareContext";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import {
  Flex,
  Container,
  Button,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Box,
} from "@chakra-ui/react";

export default function issuer() {
  const { currentAccount, allUsers, issueCred, dissmissCred } =
    useContext(IShareContext);
  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />

      {currentAccount ? (
        <Container minH="100vh" h="100%" maxW="100%" bg="gray.100" py="24px">
          <Flex
            mt="24px"
            maxW="1100px"
            mx="auto"
            flexDirection={"column-reverse"}
          >
            <Flex pb="24px">
              <Text fontSize={"2xl"} fontWeight={"800"} mr="22px">
                Active
              </Text>
              <SimpleGrid templateColumns={"repeat(3, 0.8fr)"}>
                {allUsers.map((user) => {
                  const {
                    userId,
                    userAddress,
                    userName,
                    userLocation,
                    userAge,

                    issuerSigned,
                    issuerId,
                  } = user;

                  if (issuerSigned) {
                    return (
                      <Box key={userId}>
                        <Card maxW="300px" minW="300px" mx="12px">
                          <CardHeader>
                            <Heading size="md">{userName}</Heading>
                          </CardHeader>
                          <CardBody>
                            <Text>User Id :</Text>
                            <Text pl="8px" mb="8px" fontWeight={"600"}>
                              {userAddress.slice(0, 5) +
                                "..." +
                                userAddress.slice(35, 42)}
                            </Text>
                            <Text>Issuer Id :</Text>
                            <Text pl="8px" mb="8px" fontWeight={"600"}>
                              {issuerId.slice(0, 5) +
                                "..." +
                                issuerId.slice(35, 42)}
                            </Text>
                            <Text>Location :</Text>
                            <Text pl="8px" mb="8px" fontWeight={"600"}>
                              {userLocation}
                            </Text>
                            <Text>Age :</Text>
                            <Text pl="8px" mb="8px" fontWeight={"600"}>
                              {userAge}
                            </Text>
                          </CardBody>
                        </Card>
                      </Box>
                    );
                  }
                })}
              </SimpleGrid>
            </Flex>
            <Flex mb="24px">
              <Text fontSize={"2xl"} fontWeight={"800"}>
                Pending
              </Text>
              <SimpleGrid templateColumns={"repeat(3, 0.8fr)"}>
                {allUsers.map((user) => {
                  const {
                    userId,
                    userAddress,
                    userName,
                    userLocation,
                    userAge,

                    issuerSigned,
                    issuerId,
                  } = user;

                  if (!issuerSigned) {
                    return (
                      <Box key={userId} w="100%">
                        {" "}
                        <Card minW="300px" m="12px">
                          <CardHeader>
                            <Heading size="md">{userName}</Heading>
                          </CardHeader>
                          <CardBody>
                            <Text>User Id :</Text>
                            <Text pl="8px" mb="8px" fontWeight={"600"}>
                              {userAddress.slice(0, 5) +
                                "..." +
                                userAddress.slice(35, 42)}
                            </Text>
                            <Text>Issuer Id :</Text>
                            <Text pl="8px" mb="8px" fontWeight={"600"}>
                              {issuerId.slice(0, 5) +
                                "..." +
                                issuerId.slice(35, 42)}
                            </Text>
                            <Text>Location :</Text>
                            <Text pl="8px" mb="8px" fontWeight={"600"}>
                              {userLocation}
                            </Text>
                            <Text>Age :</Text>
                            <Text pl="8px" mb="8px" fontWeight={"600"}>
                              {userAge}
                            </Text>
                          </CardBody>
                          <CardFooter>
                            <Flex>
                              <Button
                                colorScheme="telegram"
                                w="100%"
                                onClick={() => issueCred(userId)}
                              >
                                Issue
                              </Button>
                              <Button
                                mx="4px"
                                colorScheme="red"
                                w="100%"
                                onClick={() => dissmissCred(userId)}
                              >
                                Dismiss
                              </Button>
                            </Flex>
                          </CardFooter>
                        </Card>
                      </Box>
                    );
                  }
                })}
              </SimpleGrid>
            </Flex>
          </Flex>
        </Container>
      ) : (
        <Container h="100vh">
          <Flex alignItems="center" justifyContent="center">
            <Text>Please Connect Wallet First</Text>
          </Flex>
        </Container>
      )}
    </>
  );
}
