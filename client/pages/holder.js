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
  const [resId, setResId] = useState("");
  const {
    currentAccount,
    requestCredential,
    allUsers,
    acceptCred,
    requests,
    giveCon,
    revokeCon,
    getVerifier,
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
            justifyContent="flex-start"
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

                    issuerSigned,
                    issuerId,
                  } = user;

                  if (issuerSigned == true && userAddress == currentAccount) {
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
                  } = user;

                  if (
                    issuerSigned == true &&
                    userAddress == currentAccount &&
                    userSigned == true
                  ) {
                    return (
                      <Box key={userId} py="24px" mx="auto" w="512px">
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
                            <Input
                              type={"text"}
                              placeholder="Enter receiptant address"
                              onChange={(e) => setResId(e.target.value)}
                            />
                          </CardBody>
                          <Flex flexDirection={"column"}>
                            <Button
                              colorScheme="telegram"
                              w="90%"
                              my="6px"
                              mx="auto"
                              onClick={() => giveCon(userId, resId)}
                            >
                              Give Concent
                            </Button>
                            <Button
                              colorScheme="red"
                              w="90%"
                              my="6px"
                              mb="24px"
                              mx="auto"
                              onClick={() => revokeCon(userId, resId)}
                            >
                              Revoke Concent
                            </Button>
                          </Flex>
                        </Card>
                      </Box>
                    );
                  }
                })}
              </Box>
            </Box>
            <Box mx={"24px"}>
              <Text fontWeight={"700"} fontSize={"xl"}>
                Requests
              </Text>
              {requests.map((request) => {
                return (
                  <Card
                    key={request}
                    my={"24px"}
                    borderRadius={"8px"}
                    py={"16px"}
                    px={"16px"}
                    w="450px"
                  >
                    <Text fontWeight={"700"}>Receiptant Id :</Text>
                    <Text py="2px" px="8px">
                      {request}
                    </Text>
                    <Button
                      colorScheme={"telegram"}
                      my="12px"
                      onClick={() => getVerifier(request)}
                    >
                      Check Concent
                    </Button>
                  </Card>
                );
              })}
            </Box>
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
