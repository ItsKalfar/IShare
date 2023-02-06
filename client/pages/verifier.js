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
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";

export default function verifier() {
  const { currentAccount, allUsers, requestCon, verify } =
    useContext(IShareContext);
  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      {currentAccount ? (
        <Container h="100%" minH={"100vh"} maxW="100%" bg="gray.100" py="24px">
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            mt="24px"
            maxW="512px"
            mx="auto"
          >
            <Text textAlign={"center"} fontSize="xl" fontWeight={"700"}>
              All Credentials
            </Text>
            <SimpleGrid minW={"1100px"} templateColumns={"repeat(3, 0.9fr)"}>
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

                if (issuerSigned == true && userSigned == true) {
                  return (
                    <Card minW="300px" m="12px" key={userId}>
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
                          w="100%"
                          colorScheme={"telegram"}
                          onClick={() => requestCon()}
                          mb="12px"
                        >
                          Request Concent
                        </Button>
                        <Button
                          w="100%"
                          colorScheme={"green"}
                          onClick={() => verify(userId)}
                        >
                          Verify
                        </Button>
                      </CardBody>
                    </Card>
                  );
                }
              })}
            </SimpleGrid>
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
