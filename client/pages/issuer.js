import React, { useState, useContext } from "react";
import { IShareContext } from "../context/IShareContext";
import Head from "next/head";
import { toast, Toaster } from "react-hot-toast";
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
} from "@chakra-ui/react";

export default function issuer() {
  const { currentAccount, requestCredential, allUsers } =
    useContext(IShareContext);
  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />

      {currentAccount ? (
        <Container h="100vh" maxW="100%" bg="gray.100" py="24px">
          <Flex mt="24px" maxW="1100px" mx="auto">
            {allUsers.map((user) => {
              const {
                userId,
                userAddress,
                userName,
                userLocation,
                userAge,
                userSigned,
                issuerSigned,
                isserId,
                issueDate,
              } = user;

              let usersAge = parseInt(userAge);

              if (userSigned && issuerSigned) {
                return (
                  <SimpleGrid
                    spacing="4"
                    templateColumns="repeat(auto-fill, minmax(200px, 0.8fr))"
                    key={userId}
                  >
                    <Card>
                      <CardHeader>
                        <Heading size="md">{userName}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{userAddress}</Text>
                        <Text>{userLocation}</Text>
                        <Text>{usersAge}</Text>
                      </CardBody>
                      <CardFooter>
                        <Button colorScheme="telegram">View here</Button>
                      </CardFooter>
                    </Card>
                  </SimpleGrid>
                );
              }
            })}
            {allUsers.map((user) => {
              const {
                userId,
                userAddress,
                userName,
                userLocation,
                userAge,
                userSigned,
                issuerSigned,
                isserId,
                issueDate,
              } = user;

              return (
                <SimpleGrid
                  templateColumns="repeat(3, 0.5fr))"
                  key={userId}
                  w="100%"
                >
                  <Card maxW="300px" minW="200px" mx="12px">
                    <CardHeader>
                      <Heading size="md">{userName}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        {userAddress.slice(0, 5) +
                          "..." +
                          userAddress.slice(35, 42)}
                      </Text>
                      <Text>{userLocation}</Text>
                      <Text>{userAge}</Text>
                      <Text>
                        {"Issue Date : " +
                          issueDate.getDate() +
                          "/" +
                          issueDate.getMonth() +
                          "/" +
                          issueDate.getFullYear()}
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Flex>
                        <Button colorScheme="telegram" w="100%">
                          Issue
                        </Button>
                        <Button mx="4px" colorScheme="red" w="100%">
                          Dismiss
                        </Button>
                      </Flex>
                    </CardFooter>
                  </Card>
                </SimpleGrid>
              );
            })}
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
