import React, { useState, useEffect } from 'react';
import TokenInfo from '@/components/TokenInfo';
import WalletConnect from '@/components/WalletConnect';
import { Helmet } from 'react-helmet-async';
import TransactionHistory from '@/components/TransactionHistory';
import TokenTransferForm from '@/components/TokenTransferForm';
import TokenPurchase from '@/components/TokenPurchase';

const NETWORKS = {
  '0x1': 'Ethereum Mainnet',
  '0x5': 'Goerli Testnet',
  '0x89': 'Polygon Mainnet',
  '0x13881': 'Mumbai Testnet',
  '0x539': 'BSC Mainnet',
  '0x61': 'BSC Testnet',
  '0x4': 'Rinkeby Testnet',
  '0x2a': 'Kovan Testnet',
  '0x3': 'Ropsten Testnet',
  '0x4d': 'Rsk Mainnet',
  '0x7a69': 'Localhost 8545',
};

const HomePage = () => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [networkStatus, setNetworkStatus] = useState({
    isConnected: false,
    chainId: null as string | null,
    networkName: '',
    blockNumber: null as number | null,
  });

  const toggleTransactions = () => {
    setShowTransactions(!showTransactions);
  };

  useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        try {
          // 获取当前chainId
          const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as keyof typeof NETWORKS;
          // 获取当前区块
          const blockNumber = await window.ethereum.request({ method: 'eth_blockNumber' });
          // 获取账户以检查是否已连接
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });

          setNetworkStatus({
            isConnected: accounts.length > 0,
            chainId,
            networkName: NETWORKS[chainId] || '未知网络',
            blockNumber: parseInt(blockNumber, 16),
          });
        } catch (error) {
          console.error('获取网络状态失败:', error);
          setNetworkStatus({
            isConnected: false,
            chainId: null,
            networkName: '',
            blockNumber: null,
          });
        }
      }
    };

    // 初始检查
    checkNetwork();

    // 监听网络变化
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId: string) => {
        checkNetwork();
      });

      // 监听账户变化
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        checkNetwork();
      });
    }

    // 清理监听器
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', checkNetwork);
        window.ethereum.removeListener('accountsChanged', checkNetwork);
      }
    };
  }, []);

  const getStatusDisplay = () => {
    if (!window.ethereum) {
      return {
        text: '未安装钱包',
        class: 'bg-red-100 text-red-700'
      };
    }
    if (!networkStatus.isConnected) {
      return {
        text: '未连接',
        class: 'bg-yellow-100 text-yellow-700'
      };
    }
    return {
      text: '已连接',
      class: 'bg-green-100 text-green-700'
    };
  };

  const status = getStatusDisplay();

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>🐻🐻🐻一灯SPA架构</title>
        <meta name="description" content="基于React的DApp应用" />
      </Helmet>

      {/* 顶部导航栏 */}
      <nav className="sticky top-0 border-b bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold">🐻</span>
            <span className="hidden sm:block font-semibold">一灯SPA架构</span>
          </div>
          <WalletConnect />
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧面板 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Token信息区域 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">💎</span>
                Token信息
              </h2>
              <TokenInfo />
            </div>
            {/* 代币购买区域 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                代币购买
              </h2>
              <TokenPurchase />
            </div>
            {/* 转账区域 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">💸</span>
                转账
              </h2>
              <TokenTransferForm />
            </div>
            {/* 交易历史区域 */}
            <div className={`transition-all duration-300 ${showTransactions ? 'block' : 'hidden'}`}>
              <TransactionHistory />
            </div>
          </div>

          {/* 右侧面板 */}
          <div className="space-y-6">
            {/* 快速操作 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">⚡</span>
                快速操作
              </h2>
              <div className="space-y-4">
                <button
                  onClick={toggleTransactions}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <span className="mr-2">{showTransactions ? '隐藏' : '查看'}交易历史</span>
                </button>
                <button className="w-full border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <span className="mr-2">⚙️</span>
                  账户设置
                </button>
              </div>
            </div>

            {/* 系统状态 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">📊</span>
                系统状态
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">网络状态</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${status.class}`}>
                    {status.text}
                  </span>
                </div>
                {networkStatus.isConnected && (
                  <>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">当前网络</span>
                      <span className="text-sm font-medium">{networkStatus.networkName}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">当前区块</span>
                      <span className="font-mono text-sm">#{networkStatus.blockNumber}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;