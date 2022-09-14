import React, { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
    icoAbi,
    pfpAbi,
    icoContractAddress,
    pfpContractAddress,
    usdtContractAddress,
    bnbContractAddress,
    wbtcContractAddress,
} from '../utills/constants/constants';

const ContextWallet = createContext();

export function ContextConnect({ children }) {
    const [walletAddress, setWalletAddress] = useState(); /*Set wallet Address*/

    const [bnbBalance, setbnbBalance] = useState(); /*Set wallet Address*/
    const [wbtcBalance, setwbtcBalance] = useState(); /*Set wallet Address*/
    const [pfpBalance, setpfpBalance] = useState(); /*Set wallet Address*/
    const [usdtBalance, setusdtBalance] = useState(); /*Set wallet Address*/
    const [approveOwner, setapproveOwner] = useState();
    // console.log(
    //     '🚀 ~ file: ContextConnect.jsx ~ line 24 ~ ContextConnect ~ approveOwner',
    //     approveOwner
    // );
    const provider = new ethers.providers.Web3Provider(
        window.ethereum
    ); /*Provider ethers.js*/
    const signer = provider.getSigner(); /*Sender ethers.js*/

    // Methode to connect wallet
    const connectWallet = async () => {
        const address = await provider.send('eth_requestAccounts', []);
        setWalletAddress(address[0]);
    };
    // PFP Contract Functions
    const pfpContractFunction = async () => {
        const pfpContract = new ethers.Contract(
            pfpContractAddress,
            pfpAbi,
            provider
        );
        const allowanceAmount = await pfpContract.allowance(
            walletAddress,
            pfpContractAddress
        );
        const allowance = ethers.utils.formatEther(allowanceAmount);
        console.log('🚀 ~ file: ContextConnect.jsx ~ line 48 ~ pfpContract ~ formatOwner', allowance);
    };

    // USDT Contract Functions

    const usdtContractFunction = async () => {
        const usdtContract = new ethers.Contract(
            usdtContractAddress,
            pfpAbi,
            signer
        );
        const icoContract = new ethers.Contract(
            icoContractAddress,
            icoAbi,
            signer
        );
        const allowanceAmount = await usdtContract.allowance(
            walletAddress,
            icoContractAddress
        );
        const formatOwner = ethers.utils.formatEther(allowanceAmount);

        if (formatOwner === 0) {
            const allowanceValue = ethers.utils.parseEther('10000');

            const approveAllowanceAmount = await usdtContract.approve(
                icoContractAddress,
                allowanceValue,
            );
            console.log("🚀 ~ file: ContextConnect.jsx ~ line 78 ~ usdtContractFunction ~ approveAllowanceAmount", approveAllowanceAmount)

        } else {
            const parseapproveOwner = ethers.utils.parseEther(approveOwner);
            const investUSDT = await icoContract.investUSDT(parseapproveOwner);
            console.log('🚀 ~ file: ContextConnect.jsx ~ line 96 ~ usdtContractAdd ~ investUSDT', investUSDT);
        }
    };

    const getBalance = async () => {
        if (walletAddress) {
            // const bnbContract = new ethers.Contract(
            //     bnbContractAddress,
            //     pfpAbi,
            //     provider
            // );
            // const bnb = await bnbContract.balanceOf(walletAddress);
            // const bnbBalance = ethers.utils.formatEther(bnb);
            // console.log("🚀 ~ file: ContextConnect.jsx ~ line 108 ~ getBalance ~ bnbBalance", bnbBalance)
            // setbnbBalance(bnbBalance);

            const balance = await provider.getBalance(walletAddress);
            const bnb = ethers.utils.formatEther(balance);
            setbnbBalance(bnb);

            //   pfp balance
            const pfpContract = new ethers.Contract(
                pfpContractAddress,
                pfpAbi,
                provider
            );
            const pfp = await pfpContract.balanceOf(walletAddress);
            const pfpBalance = ethers.utils.formatEther(pfp);
            setpfpBalance(pfpBalance);

            // usdt balance
            const usdtContract = new ethers.Contract(
                pfpContractAddress,
                pfpAbi,
                provider
            );
            const usdt = await usdtContract.balanceOf(walletAddress);
            const usdtBal = ethers.utils.formatEther(usdt);
            setusdtBalance(usdtBal);

            // wbtc balance
            const wbtcContract = new ethers.Contract(
                wbtcContractAddress,
                pfpAbi,
                provider
            );
            const wbtc = await wbtcContract.balanceOf(walletAddress);
            const wbtcBalance = ethers.utils.formatEther(wbtc);
            setwbtcBalance(wbtcBalance);

        } else {
            console.log('no address');
        }
    };

    useEffect(() => {
        getBalance()
        pfpContractFunction()
    }, [walletAddress]);

    return (
        <ContextWallet.Provider
            value={{
                connectWallet,
                walletAddress,
                bnbBalance,
                pfpBalance,
                usdtBalance,
                wbtcBalance,
                usdtContractFunction,
                setapproveOwner,
            }}
        >
            {children}
        </ContextWallet.Provider>
    );
}

export default ContextWallet;
