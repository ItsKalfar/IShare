import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import IShareABI from "../constants/IShareABI.json";

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const IShareContext = createContext();

export const IShareContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isRequested, setIsRequested] = useState(false);
  const IShareContract = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const ABI = IShareABI.abi;

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return toast.error("Please install Metamask first");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
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

  const requestCredential = async (name, location, age) => {
    try {
      if (!name || !location || !age) {
        return toast.error("Please provide all details");
      }

      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        const { ethereum } = window;
        if (ethereum) {
          if (!isRequested) {
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const IShare = new ethers.Contract(IShareContract, ABI, signer);
            let tx = await IShare.requestCredentials(name, location, age);
            await tx.wait();
            toast.success("Request Sent!");
            setIsRequested(true);
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [currentAccount]);

  return (
    <IShareContext.Provider
      value={{ connectWallet, currentAccount, requestCredential, isRequested }}
    >
      {children}
    </IShareContext.Provider>
  );
};
