import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Flex, Container, Button, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Ishare</title>
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
            <Button mx="6px" colorScheme="telegram">
              <Link href="/holder">Student</Link>
            </Button>
            <Button mx="6px" colorScheme="telegram">
              <Link href="/issuer">College</Link>
            </Button>
            <Button mx="6px" colorScheme="telegram">
              <Link href="/verifier">Verifier</Link>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
