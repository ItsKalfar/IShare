import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import IShareABI from "../constants/IShareABI.json";
import { ethers } from "ethers";

let eth: any;
let web3: any;

if (typeof window !== "undefined") {
  eth = (window as any).ethereum;
  web3 = (window as any).web3;
}

type Props = {
  children: React.ReactNode;
};
type ContextType = {
  currentAccount: string | null;
  connectWallet: Function;
  requestCredential: Function;
};

export const IShareContext = createContext<ContextType | null>(null);

export const IShareContextProvider = ({ children }: Props) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const IShareContract: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
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

  const requestCredential = async (
    name: string,
    location: string,
    age: number
  ) => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.;
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
      console.log(error);
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
