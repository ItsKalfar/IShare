import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { IShareContextProvider } from "../context/IShareContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <IShareContextProvider>
        <div>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </IShareContextProvider>
    </ChakraProvider>
  );
}
