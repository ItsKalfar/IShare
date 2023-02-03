import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  Flex,
  Box,
  Spacer,
  MenuItem,
  Button,
  Container,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { IShareContext } from "../context/IShareContext";

import { FcMenu, FcAbout, FcHome } from "react-icons/fc";

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
