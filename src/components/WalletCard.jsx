import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

const WalletCard = ({onConnect}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  useEffect(() => {
    async function detectProvider() {
      const provider = await detectEthereumProvider();

      if (provider) {
        startApp(provider);
      } else {
        setConnButtonText('Install MetaMask');
        console.log('Please install MetaMask!');
      }
    }

    function startApp(provider) {
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      }
    }

    detectProvider();
  }, []);

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        accountChangedHandler(accounts[0]);
        setConnButtonText('Wallet Connected');
        getAccountBalance(accounts[0]);
        onConnect();
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount);
  };

  const getAccountBalance = async (account) => {
    try {
      const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] });
      setUserBalance(parseInt(balance, 16));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        accountChangedHandler(accounts[0]);
        window.location.reload();
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', accountChangedHandler);
          window.ethereum.removeListener('chainChanged', chainChangedHandler);
        }
      };
    }
  }, []);

  return (
    <div className="font-semibold px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">
      <button onClick={connectWalletHandler}>{connButtonText}</button>
    </div>
  );
};

export default WalletCard;
