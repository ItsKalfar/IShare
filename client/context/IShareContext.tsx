import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

let eth: any;

if (typeof window !== "undefined") {
  eth = (window as any).ethereum;
}

type Props = {
  children: React.ReactNode;
};
type ContextType = {
  currentAccount: string | null;
  connectWallet: Function;
  setProfile: Function;
};

export const IShareContext = createContext<ContextType | null>(null);

export const IShareContextProvider = ({ children }: Props) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [userProfile, setUserProfile] = useState("");
  const router = useRouter();

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

  const setProfile = (profile: string) => {
    if (currentAccount !== null) {
      setUserProfile(profile);
    }
  };

  const checkProfile = () => {
    if (currentAccount !== null) {
      if (userProfile === "holder") {
        router.push("/holder");
      }
      if (userProfile === "issuer") {
        router.push("/issuer");
      }
      if (userProfile === "verifier") {
        router.push("/verifier");
      }
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkProfile();
    console.log("run");
  }, [currentAccount]);

  return (
    <IShareContext.Provider
      value={{ currentAccount, connectWallet, setProfile }}
    >
      {children}
    </IShareContext.Provider>
  );
};
