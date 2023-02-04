import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import IShareABI from "../constants/IShareABI.json";
import { ethers } from "ethers";

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const IShareContext = createContext();

export const IShareContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  let IShareContract = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const ABI = IShareABI.abi;

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return toast.error("Please install Metamask First");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);

      toast.success("Wallet Connected!");
    } catch (error) {
      toast.error("Sumthing Went Wrong");
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
      toast.error("Sumthing Went Wrong");
    }
  };

  const requestCredential = async (name, location, age) => {
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        const { ethereum } = window;
        if (ethereum) {
          let provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const IShare = new ethers.Contract(IShareContract, ABI, signer);
          if (!name || !location || !age) {
            toast.error("Please Provide All The Details");
          }
          let reqCred = await IShare.requestCredentials(name, location, age);
          IShare.on("RequestSent", () => {
            toast.success("Request sent!");
          });
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
      value={{ currentAccount, connectWallet, requestCredential }}
    >
      {children}
    </IShareContext.Provider>
  );
};
