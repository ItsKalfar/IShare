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

export default function verifier() {
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
          <Flex>
            <Text></Text>
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
