import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Flex,
  Button,
  Heading,
  FormLabel,
  Input,
  chakra,
  Spinner,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

const Signin = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  if (status === "loading")
    return (
      <Container h="100vh">
        <Flex alignItems="center" justifyContent="center" h="50%">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </Container>
    );

  if (session) {
    setTimeout(() => {
      push("/");
    }, 5000);

    return (
      <Container>
        <Flex>
          <Heading>you are already signed in</Heading>;
        </Flex>
      </Container>
    );
  }

  return (
    <Container h="100vh">
      <Flex alignItems="center" justifyContent="center" h="50%">
        <chakra.form>
          <FormLabel>Email Address</FormLabel>
          <Input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" w="100%" my={5} colorScheme="telegram">
            Login
          </Button>
        </chakra.form>
      </Flex>
    </Container>
  );
};

export default Signin;
