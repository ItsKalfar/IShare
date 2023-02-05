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
  const [allUsers, setAllUsers] = useState([]);
  const IShareContract = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const rpcUrl = process.env.NEXT_PUBLIC_RPC;
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

  const getCredentials = async () => {
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const IShare = new ethers.Contract(IShareContract, ABI, signer);
          let userID = await IShare.getCurrentUserId();
          userID = parseInt(userID);
          for (let index = 1; index <= userID; index++) {
            let getCred = await IShare.getUsers(index);
            let user = {
              userId: getCred.userId.toString(),
              userAddress: getCred.userAddress.toString(),
              userName: getCred.userName.toString(),
              userLocation: getCred.userLocation.toString(),
              userAge: getCred.userAge.toString(),
              userSigned: getCred.userSigned,
              issuerSigned: getCred.issuerSigned,
              issuerId: getCred.issuerId.toString(),
              issueDate: new Date(parseInt(getCred.issueDate)),
            };
            setAllUsers((prev) => [user, ...prev]);
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
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
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const IShare = new ethers.Contract(IShareContract, ABI, signer);
          let tx = await IShare.requestCredentials(name, location, age);
          await tx.wait();
          toast.success("Request Sent!");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const issueCred = async (userId) => {
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const IShare = new ethers.Contract(IShareContract, ABI, signer);
          let tx = await IShare.issueCredentials(userId);
          await tx.wait();
          toast.success("Issued!");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const dissmissCred = async (userId) => {
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const IShare = new ethers.Contract(IShareContract, ABI, signer);
          let tx = await IShare.dismissRequest(userId);
          await tx.wait();
          toast.success("Dismissed");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const acceptCred = async (userId) => {
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const IShare = new ethers.Contract(IShareContract, ABI, signer);
          let tx = await IShare.acceptCredentials(userId);
          await tx.wait();
          toast.success("Accepted");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const requestCon = async () => {
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const IShare = new ethers.Contract(IShareContract, ABI, signer);
          let tx = await IShare.requestConcent();
          await tx.wait();
          toast.success("Request Sent");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const giveCon = async (userId, verifierId, verifierAddress) => {};
  const revokeCon = async (userId, verifierAddress) => {};
  const checkCon = async (userId, verifierAddress) => {};
  const verify = async (userId, verifierAddress) => {};
  const getVerifier = async (verifierAddress) => {};
  const reqAccounts = async (userId) => {};

  useEffect(() => {
    checkIfWalletIsConnected();
    if (currentAccount) {
      getCredentials();
    }
  }, [currentAccount]);

  return (
    <IShareContext.Provider
      value={{
        connectWallet,
        currentAccount,
        requestCredential,
        allUsers,
        issue,
      }}
    >
      {children}
    </IShareContext.Provider>
  );
};
