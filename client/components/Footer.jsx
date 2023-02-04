import { Box, Container } from "@chakra-ui/react";
import React from "react";

const Footer = () => (
  <Container maxW="1280px">
    <Box
      textAlign="center"
      p="5"
      color="gray.600"
      borderTop="2px"
      borderColor="gray.100"
    >
      2023 IShare, Inc.
    </Box>
  </Container>
);

export default Footer;
