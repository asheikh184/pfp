import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import {
  icoAbi,
  pfpAbi,
  icoContractAddress,
  pfpContractAddress,
  usdtContractAddress,
  wbtcContractAddress,
} from '../utills/constants/constants';
import { useToast } from '@chakra-ui/react';
import detectEthereumProvider from '@metamask/detect-provider';

const ContextWallet = createContext();
export function ContextConnect({ children }) {
  const toast = useToast();
  const [walletAddress, setWalletAddress] = useState();
  const [bnbBalance, setbnbBalance] = useState();
  const [wbtcBalance, setwbtcBalance] = useState();
  const [pfpBalance, setpfpBalance] = useState();
  const [usdtBalance, setusdtBalance] = useState();
  const [input, setInput] = useState();
  const [inputPfp, setinputPfp] = useState();
  const [isApproveButton, setisApproveButton] = useState(false);
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const [network, setNetwork] = useState('BNB');
  const [convertedToken, setconvertedToken] = useState(0);
  const [convertedCurrency, setconvertedCurrency] = useState(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const handleChange = (e, name) => {
    console.log(
      '🚀 ~ file: ContextConnect.jsx ~ line 35 ~ handleChange ~ name',
      name
    );
    if (name === 'quantity') {
      setinputPfp(prevState => ({ ...prevState, [name]: e.target.value }));
    } else {
      setInput(prevState => ({ ...prevState, [name]: e.target.value }));
    }
  };
  console.log(
    '🚀 ~ file: ContextConnect.jsx ~ line 42 ~ ContextConnect ~ inputPfp',
    inputPfp
  );

  // Methode to connect wallet
  const connectWallet = async () => {
    const requiredChainId = '0x61';
    const ethereum = await detectEthereumProvider();

    if (ethereum && (prompt || (await ethereum.isConnected()))) {
      ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: requiredChainId,
              // chainName: requiredNetwork,
              // nativeCurrency: {
              //   name: "Binance Coin",
              //   symbol: "BNB",
              //   decimals: 18,
              // },
              // rpcUrls: [rpcUrls],
              // blockExplorerUrls: [exporler],
            },
          ],
        })
        .catch(error => {
          console.log(error);
        });
      ethereum.on('accountsChanged', () => {
        window.location.reload();
      });

      ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      const [account] = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      //updateVisitorsAddress(account);
      const chainId = await ethereum.request({
        method: 'eth_chainId',
      });
      console.log(
        '🚀 ~ file: ContextConnect.jsx ~ line 80 ~ connectWal ~ chainId',
        chainId
      );

      if (chainId === requiredChainId) {
        const address = await provider.send('eth_requestAccounts', []);
        setWalletAddress(address[0]);
        // setButtonText(shortAddress(account));
        // // if (todo) {
        // //   return todo(account, new Web3(ethereum));
        // // }
      }
    }
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
    console.log(
      '🚀 ~ file: ContextConnect.jsx ~ line 48 ~ pfpContract ~ formatOwner',
      allowance
    );
  };

  // USDT Contract Functions

  const usdtContractFunction = async () => {
    console.log('usdtcontract function');
    const usdtContract = new ethers.Contract(
      usdtContractAddress,
      pfpAbi,
      signer
    );
    const icoContract = new ethers.Contract(icoContractAddress, icoAbi, signer);
    console.log('check');
    const allowanceAmount = await usdtContract.allowance(
      walletAddress,
      icoContractAddress
    );

    const adjustedAllowance = ethers.utils.formatEther(allowanceAmount);
    console.log(
      '🚀 ~ file: ContextConnect.jsx ~ line 70 ~ usdtContractFunction ~ adjustedAllowance',
      adjustedAllowance
    );

    if (adjustedAllowance < 1) {
      console.log('This is if statement');
      setisApproveButton(true);
    } else {
      setIsLoadingBuy(true);
      const convertedObject = Object.values(input)[0];

      const convertedInput = ethers.utils.parseEther(convertedObject);
      const investUSD = await icoContract.investUSDT(convertedInput, {
        gasLimit: 3000000,
      });
      console.log(
        '🚀 ~ file: ContextConnect.jsx ~ line 98 ~ usdtContractFunction ~ investUSD',
        investUSD
      );
      icoContract.on('InvestUSDT', (to, amount, from) => {
        console.log(to, amount, from);
        const etherAmount = ethers.utils.formatEther(amount);

        toast({
          description: `${from} PFP transfered to ${to} converted from ${etherAmount} USDT.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setIsLoadingBuy(false);
        getBalance();

        window.ethereum.sendAsync(
          {
            method: 'metamask_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: '0xA453F89d58485B2F00064c7322fB826fAc0962D1',
                symbol: 'PFP',
                decimals: 18,
                image:
                  'https://netflix-99.s3.amazonaws.com/2022-09-19T10-42-49.599Zcoin.png',
              },
            },
            id: 20,
          },
          console.log
        );
      });
      setisApproveButton(false);
    }
  };
  // approve owner function
  const approveOwner = async () => {
    const usdtContract = new ethers.Contract(
      usdtContractAddress,
      pfpAbi,
      signer
    );
    await usdtContract.approve(icoContractAddress, '20000000000000000000000');
    setisApproveButton(false);
  };
  //   WBTC contract function
  const wbtcContractFunction = async () => {
    console.log('wbtccontract function');
    const wbtcContract = new ethers.Contract(
      wbtcContractAddress,
      pfpAbi,
      signer
    );
    const icoContract = new ethers.Contract(icoContractAddress, icoAbi, signer);

    const allowanceAmount = await wbtcContract.allowance(
      walletAddress,
      icoContractAddress
    );

    const adjustedAllowance = ethers.utils.formatEther(allowanceAmount);
    console.log(
      '🚀 ~ file: ContextConnect.jsx ~ line 70 ~ usdtContractFunction ~ adjustedAllowance',
      adjustedAllowance
    );

    if (adjustedAllowance < 1) {
      console.log('This is if statement');
      setisApproveButton(true);
    } else {
      const convertedObject = Object.values(input)[0];

      const convertedInput = ethers.utils.parseEther(convertedObject);

      const investwbtc = await icoContract.investWBTC(convertedInput, {
        gasLimit: 3000000,
      });
      icoContract.on('InvestWBTC', (to, amount, from) => {
        console.log(to, amount, from);
        const etherAmount = ethers.utils.formatEther(amount);
        toast({
          description: `${from} PFP transfered to Your wallet address ${to} at the price of ${etherAmount} WBTC.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        window.ethereum.sendAsync(
          {
            method: 'metamask_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: '0xA453F89d58485B2F00064c7322fB826fAc0962D1',
                symbol: 'PFP',
                decimals: 18,
                image:
                  'https://netflix-99.s3.amazonaws.com/2022-09-19T10-42-49.599Zcoin.png',
              },
            },
            id: 20,
          },
          console.log
        );
      });
    }
  };
  //     BNB contract function
  const bnbContractFunction = async () => {
    const icoContract = new ethers.Contract(icoContractAddress, icoAbi, signer);
    const convertedObject = Object.values(input)[0];
    const convertedInput = ethers.utils.parseEther(convertedObject);
    const transaction = await icoContract.investBNB({
      value: convertedInput,
      gasLimit: 3000000,
    });
    icoContract.on('InvestBNB', (to, amount, from) => {
      console.log(to, amount, from);
      const etherAmount = ethers.utils.formatEther(amount);
      toast({
        description: `${from} PFP transfered to Your wallet address ${to} at the price of ${etherAmount} BNB.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      window.ethereum.sendAsync(
        {
          method: 'metamask_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: '0xA453F89d58485B2F00064c7322fB826fAc0962D1',
              symbol: 'PFP',
              decimals: 18,
              image:
                'https://netflix-99.s3.amazonaws.com/2022-09-19T10-42-49.599Zcoin.png',
            },
          },
          id: 20,
        },
        console.log
      );
    });
    console.log(
      '🚀 ~ file: ContextConnect.jsx ~ line 158 ~ bnbContractFunction ~ transaction',
      transaction
    );
  };
  //     Fetch Balances
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
      console.log(bnb);
      const bnbNumber = Number(bnb);
      setbnbBalance(bnbNumber.toFixed(4));

      //   pfp balance
      const pfpContract = new ethers.Contract(
        pfpContractAddress,
        pfpAbi,
        provider
      );
      const pfp = await pfpContract.balanceOf(walletAddress);
      const pfpBalance = ethers.utils.formatEther(pfp);
      console.log(pfpBalance);
      const pfpNumber = Number(pfpBalance);
      setpfpBalance(pfpNumber.toFixed(4));

      // usdt balance
      const usdtContract = new ethers.Contract(
        usdtContractAddress,
        pfpAbi,
        provider
      );
      const usdt = await usdtContract.balanceOf(walletAddress);
      const usdtBal = ethers.utils.formatEther(usdt);
      console.log(usdtBal);
      const usdtNumber = Number(usdtBal);

      setusdtBalance(usdtNumber.toFixed(4));

      // wbtc balance
      const wbtcContract = new ethers.Contract(
        wbtcContractAddress,
        pfpAbi,
        provider
      );
      const wbtc = await wbtcContract.balanceOf(walletAddress);
      const wbtcBalance = ethers.utils.formatEther(wbtc);
      console.log(wbtcBalance);
      const wbtcNumber = Number(wbtcBalance);
      setwbtcBalance(wbtcNumber.toFixed(4));
    } else {
      console.log('no address');
    }
  };
  // convert usdt to pfp token

  const usdtToPfp = async () => {
    const convertedObject = Object.values(input)[0];
    const convertedInput = ethers.utils.parseEther(convertedObject);
    const icoContract = new ethers.Contract(icoContractAddress, icoAbi, signer);
    let tokens = await icoContract.tokensAgainstUSDT(convertedInput);
    if (network === 'USTD') {
      tokens = await icoContract.tokensAgainstUSDT(convertedInput);
    } else if (network === 'WBTC') {
      tokens = await icoContract.tokensAgainstUSDT(convertedInput);
    }

    const usdtToPfpformat = ethers.utils.formatEther(tokens);

    console.log(
      '🚀 ~ file: ContextConnect.jsx ~ line 363 ~ usdtToPfp ~ usdtToPfpformat',
      usdtToPfpformat
    );
    setconvertedToken(usdtToPfpformat);
  };
  if (input) {
    usdtToPfp();
  }
  const pfoToCurrency = async () => {
    const convertedObject = Object.values(inputPfp)[0];
    const convertedInput = ethers.utils.parseEther(convertedObject);
    const icoContract = new ethers.Contract(icoContractAddress, icoAbi, signer);
    let currency = await icoContract.tokensAgainstUSDT(convertedInput);
    if (network === 'USTD') {
      currency = await icoContract.tokensAgainstUSDT(convertedInput);
    } else if (network === 'WBTC') {
      currency = await icoContract.tokensAgainstUSDT(convertedInput);
    }

    const pfpformat = ethers.utils.formatEther(currency);
    console.log(
      '🚀 ~ file: ContextConnect.jsx ~ line 388 ~ pfoToCurrency ~ pfpformat',
      pfpformat
    );

    setconvertedCurrency(pfpformat);
  };
  if (inputPfp) {
    pfoToCurrency();
  }
 
  // const fetchUsdtMarketValue = async () => {
  //   let response = await axios.get(
  //     'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=USD',
  //     {
  //       headers: {
  //         'X-CMC_PRO_API_KEY': 'f9ee05ea-6612-4b59-8d6d-15d8cd1909a8',
  //       },
  //     }
  //   );
  //   let price = response.data.data[network].quote.USD.price;
  //   console.log(
  //     '🚀 ~ file: ContextConnect.jsx ~ line 414 ~ fetchUsdtMarketValue ~ price',
  //     price
  //   );
  // };
  // if (network === 'USDT') {
  //   fetchUsdtMarketValue();
  // }
  useEffect(() => {
    getBalance();
    pfpContractFunction();
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
        wbtcContractFunction,
        bnbContractFunction,
        handleChange,
        approveOwner,
        isApproveButton,
        isLoadingBuy,
        setNetwork,
        convertedToken,
        convertedCurrency,
      }}
    >
      {children}
    </ContextWallet.Provider>
  );
}

export default ContextWallet;
