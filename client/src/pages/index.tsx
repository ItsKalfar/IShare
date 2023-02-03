import { toast, Toaster } from "react-hot-toast";
import { useContext, useState } from "react";
import Head from "next/head";
import { Flex, Container, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IShareContext } from "../../context/IShareContext";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const handleSignIn = (userProfile: string) => {
    context?.setProfile(userProfile);
    signIn();
  };

  const context = useContext(IShareContext);
  return (
    <>
      <Head>
        <title>Welcome to IShare</title>
      </Head>

      <Toaster position="top-center" reverseOrder={false} />

      <Container maxW="1280px">
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="100vh"
        >
          {" "}
          <Text mb="24px" fontSize="2xl">
            You are a...{" "}
          </Text>
          <Flex alignItems="center" justifyContent="space-between">
            <Button
              mx="6px"
              colorScheme="telegram"
              onClick={() => handleSignIn("holder")}
            >
              <Link href="/api/auth/signin">Student</Link>
            </Button>
            <Button
              mx="6px"
              colorScheme="telegram"
              onClick={() => handleSignIn("issuer")}
            >
              <Link href="/api/auth/signIn">College</Link>
            </Button>
            <Button
              mx="6px"
              colorScheme="telegram"
              onClick={() => handleSignIn("verifier")}
            >
              <Link href="/api/auth/signIn">Verifier</Link>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
