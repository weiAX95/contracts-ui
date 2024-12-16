import React from 'react';
import { useContractRead } from 'wagmi';
import YiDengToken from '@/abi/YiDengToken.json';
import { Coins, Info, Repeat } from 'lucide-react'; // 使用 lucide-react 图标

const TokenInfo = () => {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  // 合约读取hooks
  const queries = {
    name: useContractRead({
      address: contractAddress,
      abi: YiDengToken,
      functionName: 'name',
    }),
    symbol: useContractRead({
      address: contractAddress,
      abi: YiDengToken,
      functionName: 'symbol',
    }),
    totalSupply: useContractRead({
      address: contractAddress,
      abi: YiDengToken,
      functionName: 'totalSupply',
    }),
    maxSupply: useContractRead({
      address: contractAddress,
      abi: YiDengToken,
      functionName: 'MAX_SUPPLY',
    }),
    tokensPerEth: useContractRead({
      address: contractAddress,
      abi: YiDengToken,
      functionName: 'TOKENS_PER_ETH',
    }),
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Info className="w-5 h-5" />
          Token Information
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-900">
              {(queries.name.data as string) || 'Loading...'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Symbol</p>
            <p className="font-medium text-gray-900">
              {(queries.symbol.data as string) || 'Loading...'}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600">Total Supply</p>
            <p className="font-medium text-blue-900">
              {queries.totalSupply.data
                ? (queries.totalSupply.data as bigint).toString()
                : 'Loading...'}{' '}
              {queries.symbol.data as string}
            </p>
          </div>
          <Coins className="w-6 h-6 text-blue-500" />
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-indigo-600">Maximum Supply</p>
            <p className="font-medium text-indigo-900">
              {queries.maxSupply.data
                ? (queries.maxSupply.data as string).toString()
                : 'Loading...'}{' '}
              {queries.symbol.data as string}
            </p>
          </div>
          <Coins className="w-6 h-6 text-indigo-500" />
        </div>

        <div className="bg-purple-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-600">Exchange Rate</p>
            <p className="font-medium text-purple-900">
              1 ETH ={' '}
              {queries.tokensPerEth.data
                ? (queries.tokensPerEth.data as bigint).toString()
                : 'Loading...'}{' '}
              {queries.symbol.data as string}
            </p>
          </div>
          <Repeat className="w-6 h-6 text-purple-500" />
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
