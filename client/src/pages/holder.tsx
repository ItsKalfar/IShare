import React, { useState, useContext } from "react";
import { IShareContext } from "../../context/IShareContext";
import Head from "next/head";
import { toast } from "react-hot-toast";
import {
  Flex,
  Container,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

export default function Holder() {
  const [input, setInput] = useState({
    userName: "",
    location: "",
    age: "",
  });
  const context = useContext(IShareContext);
  const handleRequest = () => {
    context?.requestCredential(input.userName, input.location, input.age);
    console.log("Done");
  };

  return (
    <>
      <Head>
        <title>Welcome {input.userName}</title>
      </Head>
      {context?.currentAccount ? (
        <Container h="100vh">
          <Flex mt="24px">
            <FormControl>
              <FormLabel mt="12px">Enter Name</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, userName: e.target.value }))
                }
              />
              <FormLabel mt="12px">Enter location</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, location: e.target.value }))
                }
              />
              <FormLabel mt="12px">Enter age</FormLabel>
              <Input
                type="number"
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, age: e.target.value }))
                }
              />
              <Button
                my="24px"
                colorScheme="telegram"
                w="100%"
                onClick={handleRequest}
              >
                Request Credentials
              </Button>
            </FormControl>
          </Flex>
        </Container>
      ) : (
        <Container h="100vh">
          <Flex alignItems="center" justifyContent="center">
            <Text>Please Connect Wallet First</Text>
          </Flex>
        </Container>
      )}
    </>
  );
}
