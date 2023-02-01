import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import IShareABI from "../constants/IShareABI.json";
let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const IShareContext = createContext();

export const IShareContextProvider = ({ children }) => {
  const IShareContract = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const [currentAccount, setCurrentAccount] = useState(null);

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return toast.error("Please install Metamask First");

      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);

      toast.success("Wallet Connected!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return toast.error("Please install Metamask First");

      const accounts = await metamask.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [currentAccount]);

  return (
    <IShareContextProvider value={{ connectWallet, currentAccount }}>
      {children}
    </IShareContextProvider>
  );
};
