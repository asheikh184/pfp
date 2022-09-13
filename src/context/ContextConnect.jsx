import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { pfpContractAddress, usdtContractAddress, wbtcContractAddress } from '../utills/constants/constants';
import abiPFP from '../utills/constants/abiPFP.json'

const ContextWallet = createContext();


export function ContextConnect({ children }) {
    const [walletAddress, setWalletAddress] = useState(null)                  /*Set wallet Address*/
    const [bnbBalance, setbnbBalance] = useState()                            /*Set wallet Address*/
    const [wbtcBalance, setwbtcBalance] = useState()                          /*Set wallet Address*/
    const [pfpBalance, setpfpBalance] = useState()                            /*Set wallet Address*/
    const [usdtBalance, setusdtBalance] = useState()                            /*Set wallet Address*/
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
            const bnb = ethers.utils.formatEther(balance)
            setbnbBalance(bnb)

            const pfpContract = new ethers.Contract(pfpContractAddress, abiPFP, provider);
            const pfp = await pfpContract.balanceOf(walletAddress[0])
            setpfpBalance(pfp)

            const usdtContract = new ethers.Contract(usdtContractAddress, abiPFP, provider);
            const usdt = await usdtContract.balanceOf(walletAddress[0])
            setusdtBalance(usdt)

            const wbtcContract = new ethers.Contract(wbtcContractAddress, abiPFP, provider);
            const wbtc = await wbtcContract.balanceOf(walletAddress[0])
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

