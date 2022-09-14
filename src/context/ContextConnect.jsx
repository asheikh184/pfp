import React, { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  icoAbi,
  icoContractAddress,
  pfpContractAddress,
  usdtContractAddress,
  wbnbContractAddress,
  wbtcContractAddress,
} from '../utills/constants/constants';
import abiPFP from '../utills/constants/abiPFP.json';

const ContextWallet = createContext();

export function ContextConnect({ children }) {
  const [walletAddress, setWalletAddress] = useState(); /*Set wallet Address*/
  console.log(
    '🚀 ~ file: ContextConnect.jsx ~ line 11 ~ ContextConnect ~ walletAddress',
    walletAddress
  );
  const [bnbBalance, setbnbBalance] = useState(); /*Set wallet Address*/
  const [wbtcBalance, setwbtcBalance] = useState(); /*Set wallet Address*/
  const [pfpBalance, setpfpBalance] = useState(); /*Set wallet Address*/
  const [usdtBalance, setusdtBalance] = useState(); /*Set wallet Address*/
  const [approveOwner, setapproveOwner] = useState();
  console.log(
    '🚀 ~ file: ContextConnect.jsx ~ line 24 ~ ContextConnect ~ approveOwner',
    approveOwner
  );
  const provider = new ethers.providers.Web3Provider(
    window.ethereum
  ); /*Provider ethers.js*/
  const signer = provider.getSigner(); /*Sender ethers.js*/

  // Methode to connect wallet
  const connectWallet = async () => {
    const address = await provider.send('eth_requestAccounts', []);
    setWalletAddress(address[0]);
  };

  const pfpContract = async () => {
    const pfpContract = new ethers.Contract(
      pfpContractAddress,
      abiPFP,
      provider
    );
    console.log(pfpContract);

    const owner = await pfpContract.allowance(
      walletAddress,
      pfpContractAddress
    );

    const formatOwner = ethers.utils.formatEther(owner);
    console.log(
      '🚀 ~ file: ContextConnect.jsx ~ line 48 ~ pfpContract ~ formatOwner',
      formatOwner
    );
  };

  const usdtContractAdd = async () => {
    const usdtContract = new ethers.Contract(
      usdtContractAddress,
      abiPFP,
      signer
    );
    const icoContract = new ethers.Contract(icoContractAddress, icoAbi, signer);

    const owner = await usdtContract.allowance(
      walletAddress,
      icoContractAddress
    );
    const formatOwner = ethers.utils.formatEther(owner);
    console.log(
      '🚀 ~ file: ContextConnect.jsx ~ line 71 ~ usdtContractAdd ~ formatOwner',
      formatOwner
    );

    if (formatOwner == 0) {
      const value = ethers.utils.parseEther('10000');

      const approveOwner = await usdtContract.approve(
        icoContractAddress,
        value
      );
      console.log(
        '🚀 ~ file: ContextConnect.jsx ~ line 80 ~ usdtContractAdd ~ approveOwner',
        approveOwner
      );
    } else {
      const parseapproveOwner = ethers.utils.parseEther(approveOwner);
      const investUSDT = await icoContract.investUSDT(parseapproveOwner);
      console.log(
        '🚀 ~ file: ContextConnect.jsx ~ line 96 ~ usdtContractAdd ~ investUSDT',
        investUSDT
      );
    }
  };

  const getBalance = async () => {
    if (walletAddress) {
      const bnbContract = new ethers.Contract(
        wbnbContractAddress,
        abiPFP,
        provider
      );
      const bnb = await bnbContract.balanceOf(walletAddress);
      const bnbBalance = ethers.utils.formatEther(bnb);
      console.log(bnbBalance);
      setbnbBalance(bnbBalance);
      //   const balance = await provider.getBalance(walletAddress);
      //   const bnb = ethers.utils.formatEther(balance);
      //   setbnbBalance(bnb);
      // pfp balance
      const pfpContract = new ethers.Contract(
        pfpContractAddress,
        abiPFP,
        provider
      );
      const pfp = await pfpContract.balanceOf(walletAddress);
      const pfpBalance = ethers.utils.formatEther(pfp);
      setpfpBalance(pfpBalance);
      // usdt balance
      const usdtContract = new ethers.Contract(
        pfpContractAddress,
        abiPFP,
        provider
      );
      const usdt = await usdtContract.balanceOf(walletAddress);
      const usdtBal = ethers.utils.formatEther(usdt);
      console.log(usdtBal);
      setusdtBalance(usdtBal);
      // wbtc balance
      const wbtcContract = new ethers.Contract(
        wbtcContractAddress,
        abiPFP,
        provider
      );
      const wbtc = await wbtcContract.balanceOf(walletAddress);
      const wbtcBalance = ethers.utils.formatEther(wbtc);
      console.log(wbtcBalance);
      setwbtcBalance(wbtcBalance);
    } else {
      console.log('no address');
    }
  };

  useEffect(() => {
    pfpContract();
    getBalance();
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
        usdtContractAdd,
        setapproveOwner,
      }}
    >
      {children}
    </ContextWallet.Provider>
  );
}

export default ContextWallet;
