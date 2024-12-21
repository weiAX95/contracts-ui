import React from 'react';
import { useAccount, useConnect, useDisconnect, useBalance, useContractRead, useWriteContract } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Wallet, LogOut, Coins } from 'lucide-react';
import { YiDengToken__factory } from '../abi/index';
import YiDengToken from '../abi/YiDengToken.json';
import {
  useBlockNumber
} from 'wagmi'

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
    query: {
      refetchInterval: 10000 // 每秒轮询
    },
  });

  // useBlockNumber({ chainId: 123 })
  // const { data, error,  isSuccess } = useWriteContract({
  //   // addressOrName: '0xYourContractAddress', // 合约地址（如果已经部署）
  //   contractInterface: YiDengToken, // 合约的ABI
  //   functionName: 'deploy', // 部署函数名称，假设你合约有部署函数
  //   args: ['0x608060405260405161083e38038061083e833981016040819052610...'], // 部署合约的字节码
  // })
  // console.log(data, error, isLoading, isSuccess, write);

  const handleConnect = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('请先安装 MetaMask!');
        window.open('https://metamask.io/download/', '_blank');
        return;
      }
      await connectAsync({ connector: injected() });
    } catch (error) {
      console.error('Failed to connect:', error);
      alert('连接失败，请确保已安装并解锁 MetaMask');
    }
  };

  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const { data: tokenBalance } = useContractRead({
    address: contractAddress,
    abi: YiDengToken,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: 31337,
  });

  if (isConnected) {
    return (
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Wallet Status</h2>
              <p className="text-sm text-gray-500">Connected to MetaMask</p>
            </div>
            <Wallet className="h-8 w-8 text-blue-500" />
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Account Address</p>
              <p className="font-mono text-sm mt-1 text-gray-800 break-all">{address}</p>
            </div>

            {balance && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">ETH Balance</p>
                    <p className="font-mono text-lg mt-1 text-blue-800">
                      {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                    </p>
                  </div>
                  <Coins className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            )}

            {tokenBalance != null && (
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">YiDeng Token Balance</p>
                    <p className="font-mono text-lg mt-1 text-indigo-800">
                      {tokenBalance.toString()} YD
                    </p>
                  </div>
                  <Coins className="h-8 w-8 text-indigo-500" />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => disconnect()}
            className="w-full flex items-center justify-end gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            <LogOut className="h-5 w-5" />
            Disconnect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto flex items-center justify-end min-h-[80px] mr-2">
      <button
        onClick={handleConnect}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-xs shadow-lg"
      >
        <Wallet className="h-5 w-5" />
        Connect Wallet
      </button>
    </div>
  );
};

export default WalletConnect;
