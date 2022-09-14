import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { pfpContractAddress, usdtContractAddress, wbtcContractAddress } from '../utills/constants/constants';
import abiPFP from '../utills/constants/abiPFP.json'

const ContextWallet = createContext();


export function ContextConnect({ children }) {
    const [walletAddress, setWalletAddress] = useState()                  /*Set wallet Address*/
    console.log("🚀 ~ file: ContextConnect.jsx ~ line 11 ~ ContextConnect ~ walletAddress", walletAddress)
    const [bnbBalance, setbnbBalance] = useState()                            /*Set wallet Address*/
    const [wbtcBalance, setwbtcBalance] = useState()                          /*Set wallet Address*/
    const [pfpBalance, setpfpBalance] = useState()                            /*Set wallet Address*/
    const [usdtBalance, setusdtBalance] = useState()                            /*Set wallet Address*/
    const provider = new ethers.providers.Web3Provider(window.ethereum)       /*Provider ethers.js*/
    const signer = provider.getSigner()                                       /*Sender ethers.js*/


    // Methode to connect wallet 
    const connectWallet = async () => {
        const address = await provider.send("eth_requestAccounts", []);
        setWalletAddress(address[0])
    }

    const getBalance = async () => {
      
        if (walletAddress) {

            const balance = await provider.getBalance(walletAddress);
            console.log("🚀 ~ file: ContextConnect.jsx ~ line 31 ~ getBalance ~ balance", balance)
            const bnb = ethers.utils.formatEther(balance)
            console.log("🚀 ~ file: ContextConnect.jsx ~ line 33 ~ getBalance ~ bnb", bnb)
            setbnbBalance(bnb)

            // const pfpContract = new ethers.Contract(pfpContractAddress, abiPFP, provider);
            // const pfp = await pfpContract.balanceOf(walletAddress)
            // console.log("🚀 ~ file: ContextConnect.jsx ~ line 38 ~ getBalance ~ pfp", pfp)
            // // setpfpBalance(pfp)

            const usdtContract = new ethers.Contract(usdtContractAddress, abiPFP, provider);
            const usdt = await usdtContract.balanceOf(walletAddress)
            console.log("🚀 ~ file: ContextConnect.jsx ~ line 43 ~ getBalance ~ usdt", usdt)
            setusdtBalance(usdt)

            const wbtcContract = new ethers.Contract(wbtcContractAddress, abiPFP, provider);
            const wbtc = await wbtcContract.balanceOf(walletAddress)
            setwbtcBalance(wbtc)
        } else {
            console.log('no address')
        }
    }
    console.log(bnbBalance)
    getBalance()
    
    return (
        <ContextWallet.Provider value={{ connectWallet, walletAddress, bnbBalance, pfpBalance, usdtBalance, wbtcBalance }}>
            {children}
        </ContextWallet.Provider>
    )
}

export default ContextWallet

