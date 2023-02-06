import React from "react";
import {
  Container,
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import Head from "next/head";
import Link from "next/link";

const About = () => {
  return (
    <>
      <Head>
        <title>IShare - Digital Identity</title>
      </Head>
      <Container maxW="1100px">
        <Box h="100vh">
          <Box my="12px">
            <Text fontSize="4xl" fontWeight="bold">
              About IShare
            </Text>
          </Box>
          <Box>
            <Text fontSize="2xl">How does it works?</Text>
            <List my="12px" mx="12px">
              <ListItem my="6px">
                <ListIcon as={BsFillArrowDownCircleFill} color="green.500" />
                Holder sends the request to the issuer to issue the credentials.
              </ListItem>
              <ListItem my="6px">
                <ListIcon as={BsFillArrowDownCircleFill} color="green.500" />
                Issuer accepts the request and issue the ID card.
              </ListItem>
              <ListItem my="6px">
                <ListIcon as={BsFillArrowDownCircleFill} color="green.500" />
                Holder accepts the credentials and signes it too. Until then,
                the card is not issued.
              </ListItem>
              <ListItem my="6px">
                <ListIcon as={BsFillArrowDownCircleFill} color="green.500" />
                Then holder of the card can share his/her card and give concent
                to the verifier if verifier can verify ID or not.
              </ListItem>
              <ListItem my="6px">
                <ListIcon as={BsFillArrowDownCircleFill} color="green.500" />
                Verifier who wants to verify the credentials has to first
                request the student to give concent.
              </ListItem>
              <ListItem my="6px">
                <ListIcon as={BsFillArrowDownCircleFill} color="green.500" />
                After that, verifier can verify the credentials of the student.
              </ListItem>
              <ListItem my="6px">
                <ListIcon as={BsFillArrowDownCircleFill} color="green.500" />
                Verifier could be anyone from the next Employer to the leader of
                certain social clubs.
              </ListItem>
              <ListItem my="6px">
                <ListIcon as={BsFillArrowDownCircleFill} color="green.500" />
                Holder can also revoke the concent if needed.
              </ListItem>
            </List>
          </Box>
          <Box>
            <Text my="24px" fontSize="lg">
              A system has been built using Solidity for the smart contract
              language, Next.js for the front end of web pages and Chakra UI for
              UI components and styling. The system makes use of zero knowledge
              proofs, which allow for the authentication of users and the
              validation of transactions without revealing any confidential
              information. This provides enhanced security and privacy to the
              system, as sensitive information is kept confidential.
            </Text>
            <Text my="12px" fontSize="lg">
              This project does not catches custom errors from the smart
              contract. Also, currently not mobile responsive at this moment.
            </Text>
            <Text my="12px" fontSize="lg">
              In case of any difficulty or question, connect with me at{" "}
              <Link
                href="https://twitter.com/HeyitsSagar20"
                target="_blank"
                className="link"
              >
                @HeyitsSagar20
              </Link>
            </Text>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;
