import React, { useState, useEffect, useContext } from "react";
import { getSession, signIn } from "next-auth/react";
import { Provider } from "next-auth/providers";
import { IShareContext } from "../../context/IShareContext";
import { Container } from "@chakra-ui/react";
export default function UserInterface() {
  const context = useContext(IShareContext);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <h1>{context?.userProfile}</h1>
    </Container>
  );
}
