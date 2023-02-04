import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { IShareContextProvider } from "../../context/IShareContext";
import Navbar from "../../components/Navabr";
import Footer from "../../components/Footer";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
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
