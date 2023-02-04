import Link from "next/link";
import {
  Menu,
  Flex,
  Box,
  Spacer,
  Button,
  Container,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { IShareContext } from "../context/IShareContext";

const Navbar = () => {
  const context = useContext(IShareContext);
  return (
    <Container maxW="1280px">
      <Flex py={6}>
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

        {context?.currentAccount ? (
          <Button colorScheme="telegram">Connected</Button>
        ) : (
          <Button
            onClick={() => context?.connectWallet()}
            colorScheme="telegram"
          >
            Connect
          </Button>
        )}
      </Flex>
    </Container>
  );
};

export default Navbar;
