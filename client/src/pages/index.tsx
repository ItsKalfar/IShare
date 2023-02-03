import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import Head from "next/head";
import { Flex, Container, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IShareContext } from "../../context/IShareContext";

export default function Home() {
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
              onClick={() => context?.setProfile("holder")}
            >
              <Link href="/holder">Student</Link>
            </Button>
            <Button
              mx="6px"
              colorScheme="telegram"
              onClick={() => context?.setProfile("issuer")}
            >
              <Link href="/issuer">College</Link>
            </Button>
            <Button
              mx="6px"
              colorScheme="telegram"
              onClick={() => context?.setProfile("verifier")}
            >
              <Link href="/verifier">Verifier</Link>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
