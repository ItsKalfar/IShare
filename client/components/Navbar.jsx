import React from "react";
import Link from "next/link";
import {
  Menu,
  Flex,
  Box,
  Spacer,
  Button,
  Text,
  Container,
} from "@chakra-ui/react";
import { useContext } from "react";
import { IShareContext } from "../context/IShareContext";

const Navbar = () => {
  const { currentAccount, connectWallet } = useContext(IShareContext);
  return (
    <Container maxW="1280px" py="16px">
      <Flex>
        <Box>
          <Link href="/">
            <Text fontSize="2xl" fontWeight="bold">
              IShare
            </Text>
          </Link>
        </Box>
        <Spacer />
        <Box py={2} px={6}>
          <Menu>
            <Flex>
              <Link href="/about">
                <Text fontSize="lg">About</Text>
              </Link>
            </Flex>
          </Menu>
        </Box>

        {currentAccount ? (
          <Button colorScheme="telegram">
            {currentAccount.slice(0, 5) + "..." + currentAccount.slice(38, 42)}
          </Button>
        ) : (
          <Button onClick={() => connectWallet()} colorScheme="telegram">
            Connect
          </Button>
        )}
      </Flex>
    </Container>
  );
};

export default Navbar;
