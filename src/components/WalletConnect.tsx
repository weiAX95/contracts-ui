import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance, useContractRead } from 'wagmi';
import { ethers } from 'ethers';
import { injected } from 'wagmi/connectors';
import { Wallet, LogOut, Coins } from 'lucide-react';
import YiDengToken from '@/abi/YiDengToken.json';

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  const [isHovered, setIsHovered] = useState(false); // 新增状态来控制鼠标悬停状态
  const provider = new ethers.BrowserProvider(window.ethereum)
  const getSigner = async () => {
    const signer = await provider.getSigner();
    const a = await signer.getNonce();
    console.log(signer, a, '获取用户签名');
  }
  getSigner();

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
      <div className="max-w-full  bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-1 space-y-6 float-left">
          {isHovered && <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Wallet Status</h2>
              <p className="text-sm text-gray-500">Connected to MetaMask</p>
            </div>
            <Wallet className="h-8 w-8 text-blue-500" />
          </div>}

          <div
            className="space-y-4"
            onMouseEnter={() => setIsHovered(true)} // 鼠标移入时
            onMouseLeave={() => setIsHovered(false)} // 鼠标移出时
          >
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Account Address</p>
              <p className="font-mono text-sm mt-1 text-gray-800 break-all">
                {isHovered ? address : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </p>
            </div>

            {balance && isHovered && (
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

            {tokenBalance != null && isHovered && (
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

          {isHovered && <button
            onClick={() => disconnect()}
            className="w-full flex items-center justify-end gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            <LogOut className="h-5 w-5" />
            Disconnect Wallet
          </button>}
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
