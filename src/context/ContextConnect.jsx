import React, { createContext, useState } from 'react'
import { ethers } from 'ethers';
import { pfpContractAddress } from '../utills/constants/constants';
import abiPFP from '../utills/constants/abiPFP.json'

const ContextWallet = createContext();


export function ContextConnect({ children }) {
    const [walletAddress, setWalletAddress] = useState(null)                  /*Set wallet Address*/
    const provider = new ethers.providers.Web3Provider(window.ethereum)       /*Provider ethers.js*/
    const signer = provider.getSigner()                                       /*Sender ethers.js*/


    // Methode to connect wallet 
    const connectWallet = async () => {
        const address = await provider.send("eth_requestAccounts", []);
        setWalletAddress(address)
    }
    console.log("🚀 ~ file: ContextConnect.jsx ~ line 20 ~ connectWal ~ walletAddress", walletAddress)
    const getBalance = async () => {
        // const contract = new ethers.Contract(pfpContractAddress, abiPFP, provider);
        const balance = await provider.getBalance(walletAddress);
        console.log("🚀 ~ file: ContextConnect.jsx ~ line 25 ~ getBalance ~ balance", balance)
        const convBalance = ethers.utils.formatEther(balance)
        console.log("🚀 ~ file: ContextConnect.jsx ~ line 26 ~ getBalance ~ convBalance", convBalance)
    }
    getBalance()

    return (
        <ContextWallet.Provider value={{ connectWallet, walletAddress }}>
            {children}
        </ContextWallet.Provider>
    )
}
export default ContextWallet

