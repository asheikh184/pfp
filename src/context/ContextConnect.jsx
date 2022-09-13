import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { pfpContractAddress } from '../utills/constants/constants';
import abiPFP from '../utills/constants/abiPFP.json'

const ContextWallet = createContext();


export function ContextConnect({ children }) {
    const [walletAddress, setWalletAddress] = useState(null)                  /*Set wallet Address*/
    const [bnbBalance, setbnbBalance] = useState()                  /*Set wallet Address*/
    const [wbtcBalance, setwbtcBalance] = useState()                  /*Set wallet Address*/
    const [pfpBalance, setpfpBalance] = useState()                  /*Set wallet Address*/
    const provider = new ethers.providers.Web3Provider(window.ethereum)       /*Provider ethers.js*/
    const signer = provider.getSigner()                                       /*Sender ethers.js*/


    // Methode to connect wallet 
    const connectWallet = async () => {
        const address = await provider.send("eth_requestAccounts", []);
        setWalletAddress(address)
    }

    const getBalance = async () => {
        // const contract = new ethers.Contract(pfpContractAddress, abiPFP, provider);\
        if (walletAddress) {
            const balance = await provider.getBalance(walletAddress[0]);
            console.log("🚀 ~ file: ContextConnect.jsx ~ line 25 ~ getBalance ~ balance", balance)
            const bnb = ethers.utils.formatEther(balance)
            console.log("🚀 ~ file: ContextConnect.jsx ~ line 29 ~ getBalance ~ bnb", bnb)
            setbnbBalance(bnb)
        } else {
            console.log('no address')
        }
    }
    console.log(bnbBalance)
    getBalance()





    return (
        <ContextWallet.Provider value={{ connectWallet, walletAddress, bnbBalance }}>
            {children}
        </ContextWallet.Provider>
    )
}

export default ContextWallet

