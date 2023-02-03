import {
  Container,
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  StatArrow,
} from "@chakra-ui/react";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import Head from "next/head";

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
                In our case a student is requesting an ID to his/her college.
              </ListItem>
              <ListItem my="6px">
                <ListIcon as={BsFillArrowDownCircleFill} color="green.500" />
                College which is issuer in this case accepts the request and
                issue the ID card to the student with college's ID.
              </ListItem>
              <ListItem my="6px">
                <ListIcon as={BsFillArrowDownCircleFill} color="green.500" />
                Student accepts the credentials and signes it too. Until then,
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
                Student can also revoke the concent if needed.
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
            <Text my="24px" fontSize="lg">
              The use of Solidity in the system allows for the creation of
              self-executing contracts, which are stored on the Ethereum
              blockchain. These contracts can be triggered automatically when
              specific conditions are met, thereby enabling the creation of
              complex and automated processes. The combination of Next.js and
              Chakra UI provides a seamless user experience and a responsive,
              modern design.
            </Text>
            <Text my="24px" fontSize="lg">
              The system has been built to provide a secure and user-friendly
              platform for a variety of use cases. The use of zero knowledge
              proofs ensures that user's data and transactions are kept secure,
              while the use of the Ethereum blockchain provides immutability and
              censorship resistance. Overall, this system represents a major
              step forward in the development of secure, decentralized
              technologies.
            </Text>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;
