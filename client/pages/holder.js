import React, { useState, useContext } from "react";
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
  SimpleGrid,
  Heading,
  FormControl,
  Input,
  FormLabel,
  Box,
} from "@chakra-ui/react";

export default function Holder() {
  const [input, setInput] = useState({
    userName: "",
    location: "",
    age: "",
  });
  const {
    currentAccount,
    requestCredential,
    allUsers,
    acceptCred,
    requests,
    giveCon,
    revokeCon,
  } = useContext(IShareContext);

  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      {currentAccount ? (
        <Container h="100%" minH={"100vh"} maxW="100%" bg="gray.100" py="24px">
          <Flex
            maxW={"1100px"}
            mx="auto"
            alignItems={"flex-start"}
            justifyContent="space-between"
          >
            <Box>
              <Flex mt="24px" maxW="512px">
                <FormControl bg="white" py="6px" px="18px" borderRadius={"6px"}>
                  <FormLabel mt="12px">Enter Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        userName: e.target.value,
                      }))
                    }
                  />
                  <FormLabel mt="12px">Enter location</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                  <FormLabel mt="12px">Enter age</FormLabel>
                  <Input
                    type="number"
                    onChange={(e) =>
                      setInput((prev) => ({ ...prev, age: e.target.value }))
                    }
                  />
                  <Button
                    my="24px"
                    colorScheme="telegram"
                    w="100%"
                    onClick={() =>
                      requestCredential(
                        input.userName,
                        input.location,
                        input.age
                      )
                    }
                  >
                    Request Credentials
                  </Button>
                </FormControl>
              </Flex>
              <Box mt="24px" maxW="512px" mx="auto">
                <Text textAlign={"center"} fontSize="xl" fontWeight={"700"}>
                  Issued Credentials
                </Text>
                {allUsers.map((user) => {
                  const {
                    userId,
                    userAddress,
                    userName,
                    userLocation,
                    userAge,
                    userSigned,
                    issuerSigned,
                    issuerId,
                    issueDate,
                  } = user;

                  if (
                    issuerSigned == true &&
                    userAddress == currentAccount &&
                    userSigned == false
                  ) {
                    return (
                      <SimpleGrid
                        templateColumns="repeat(3, 1fr))"
                        key={userId}
                        py="24px"
                        mx="auto"
                        w="512px"
                      >
                        <Card minW="200px">
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
                            <Button
                              my="24px"
                              colorScheme="telegram"
                              w="100%"
                              onClick={() => acceptCred(userId)}
                            >
                              Accept Credentials
                            </Button>
                          </CardBody>
                        </Card>
                      </SimpleGrid>
                    );
                  }
                })}
              </Box>
              <Box mt="24px" maxW="512px" mx="auto">
                <Text textAlign={"center"} fontSize="xl" fontWeight={"700"}>
                  My Credentials
                </Text>
                {allUsers.map((user) => {
                  const {
                    userId,
                    userAddress,
                    userName,
                    userLocation,
                    userAge,
                    userSigned,
                    issuerSigned,
                    issuerId,
                    issueDate,
                  } = user;

                  if (
                    issuerSigned == true &&
                    userAddress == currentAccount &&
                    userSigned == true
                  ) {
                    return (
                      <SimpleGrid
                        templateColumns="repeat(3, 1fr))"
                        key={userId}
                        py="24px"
                        mx="auto"
                        w="512px"
                      >
                        <Card minW="200px">
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

                            <Text>{issuerSigned}</Text>
                          </CardBody>
                        </Card>
                      </SimpleGrid>
                    );
                  }
                })}
              </Box>
            </Box>
            <Box>
              <Text fontWeight={"700"} fontSize={"xl"}>
                Requests
              </Text>
            </Box>
          </Flex>
        </Container>
      ) : (
        <Container h="100vh">
          <Flex alignItems="center" justifyContent="center">
            <Text>Please Connect Wallet First</Text>
            {requests.map((request) => {
              return <Text>{request}</Text>;
            })}
          </Flex>
        </Container>
      )}
    </>
  );
}
