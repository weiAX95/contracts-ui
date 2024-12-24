import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Wallet, LogOut, Coins } from 'lucide-react';
import { YiDengToken__factory } from '../abi/index';
import YiDengToken from '../abi/YiDengToken.json';

const WalletConnect = () => {
  // 使用 useState 来存储 provider 和 signer
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState('');
  const [balance, setBalance] = useState('');
  useEffect(() => {
    // 这里定义一个异步函数处理与 MetaMask 的连接
    // const initializeProvider = async () => {
    //   if (window.ethereum == null) {
    //     console.log("MetaMask not installed; using read-only defaults");
    //     // 使用默认的只读 provider
    //     const defaultProvider = ethers.getDefaultProvider();
    //     console.log(defaultProvider, "defaultProvider");
    //     // setProvider(defaultProvider);
    //   } else {
    //     // 使用 Web3Provider 来连接 MetaMask
    //     const web3Provider = new ethers.BrowserProvider(window.ethereum)
    //     console.log(web3Provider, "web3Provider");
    //     // setProvider(web3Provider);
    //     const userSigner = await web3Provider.getSigner();
    //     console.log(userSigner, "userSigner");
    //     setSigner(userSigner.address);
    //   }
    // };
    // 监听账户变化
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length === 0) {
        console.log("Disconnected");
        setSigner("");
      } else {
        console.log("Connected:", accounts[0]);
        setSigner(accounts[0]);
      }
    }
    );
    // initializeProvider();
  }, []); // 依赖数组为空，确保只在组件挂载时执行一次
  function maskAddress(address: string) {
    // 确保地址是以太坊地址格式
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      throw new Error("Invalid Ethereum address format");
    }

    // 替换地址中间的字符为**
    const maskedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

    return maskedAddress;
  }

  function handleConnect() {

    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts: string[]) => {

        console.log("Connected:", accounts[0]);
        setSigner(accounts[0]);
        return accounts[0]
      }).then((res: string) => {
        window.ethereum.request({
          method: "eth_getBalance",
          params: [res, 'latest'],
        }).then((accounts: string) => {
          // console.log("eth_getBalance:", ethers.formatEther(accounts));
          // setSigner(accounts[0]);
          setBalance(ethers.formatEther(accounts));
        });
      })
      .catch((error: Error) => {
        console.error("Connect failed:", error);
      });
  }

  // 连接 MetaMask

  function handleExit() {
    // 断开 MetaMask 连接
    setSigner("");
    // window.ethereum
    //   .request({ method: "eth_accounts" })
    //   .then((accounts: string[]) => {
    //     if (accounts.length === 0) {
    //       console.log("Disconnected");
    //       setSigner("");
    //     }
    //   })
    //   .catch((error: Error) => {
    //     console.error("Disconnect failed:", error);
    //   }
    //   );
  }
  // // 示例调用
  // const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 示例地址
  // console.log(maskAddress(address)); // 输出: 0x5Fb...aa3
  return (
    <div className='flex items-center justify-center h-screen'>
      {signer ? (
        <div>

          <div className='flex items-center justify-center'>
            <div>当前用户地址：{maskAddress(signer)}</div>
            <div><button className='bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition-transform hover:scale-105' onClick={handleExit}>退出连接</button></div>
          </div>
          <div>当前用户余额：{balance}</div>
        </div>
      ) : (
        <div>
          <button className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition-transform hover:scale-105' onClick={handleConnect}>
            Connect MetaMask
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
