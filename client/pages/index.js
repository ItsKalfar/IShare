import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Flex, Container, Button, Text, Box } from "@chakra-ui/react";
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
          <Box maxW={"414px"} mb={"6px"}>
            <Text textAlign={"center"}>
              Welcome to IShare! In order to use IShare, make sure you have{" "}
              <Link
                href="https://metamask.io/"
                target="_blank"
                className="link"
              >
                Metamask.
              </Link>{" "}
              Make atleast three accounts to use IShare as a holder, issuer and
              verifier. Switch the network from Ethereum Mainnet to Goerli Test
              network. After that, fund that account with some test ETH using{" "}
              <Link
                href="https://goerlifaucet.com/"
                target="_blank"
                className="link"
              >
                Goerli Faucet.
              </Link>{" "}
              After that, connect the wallet using Connect button.
            </Text>
          </Box>
          <Text>The complete work flow is on about page.</Text>
          <Text mb="24px" fontSize="2xl">
            You are a...{" "}
          </Text>
          <Flex alignItems="center" justifyContent="space-between">
            <Button mx="6px" colorScheme="telegram">
              <Link href="/holder">Holder</Link>
            </Button>
            <Button mx="6px" colorScheme="telegram">
              <Link href="/issuer">Issuer</Link>
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
