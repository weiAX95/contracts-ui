import React, { useEffect, useState } from 'react';
import YiDengToken from '@/abi/YiDengToken.json';
import { Coins, Info, Repeat } from 'lucide-react'; // 使用 lucide-react 图标
import { ethers } from 'ethers';

const TokenInfo = () => {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  // const [signer, setSigner] = React.useState<string>('');
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [name, setName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [totalSupply, setTotalSupply] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<string>('');
  const [maxSupply, setMaxSupply] = useState<string>('');
  const [isETHFirst, setIsETHFirst] = useState(true);

  // 弹窗状态
  const [showModal, setShowModal] = useState(false); // 控制弹窗显示
  const [modalMessage, setModalMessage] = useState<string>(''); // 弹窗信息
  const [maxBuyAmount, setMaxBuyAmount] = useState<string>(''); // 最大可购买数量
  const [purchaseAmount, setPurchaseAmount] = useState<string>(''); // 用户输入的购买数量

  // 合约读取hooks ethers
  useEffect(() => {
    // 检查 window.ethereum 是否可用，MetaMask 是否已安装
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      // 获取 signer 并初始化合约
      provider.getSigner().then((signer) => {
        setSigner(signer);
        // 初始化合约
        const contractInstance = new ethers.Contract(contractAddress, YiDengToken, signer);
        setContract(contractInstance);
      }).catch((error) => {
        console.error("Error getting signer:", error);
      });
    }
  }, []);
  useEffect(() => {
    if (signer && contract) {
      // 例如，读取合约的 name 和 symbol
      contract.name().then((name: string) => {
        console.log("Token Name:", name);
        setName(name);
      }).catch((error) => console.error("Error getting token name:", error));

      contract.symbol().then((symbol: string) => {
        console.log("Token Symbol:", symbol);
        setSymbol(symbol);
      }).catch((error) => console.error("Error getting token symbol:", error));

      contract.totalSupply().then((totalSupply: string) => {
        console.log("Total Supply:", totalSupply);
        setTotalSupply(ethers.formatUnits(totalSupply, 0));
      })
      contract.MAX_SUPPLY().then((MAX_SUPPLY: string) => {
        console.log("Total Supply:", MAX_SUPPLY);
        setMaxSupply(ethers.formatUnits(MAX_SUPPLY, 0));
      }).catch((error) => console.error("Error getting total supply:", error));

      // TOKENS_PER_ETH
      contract.TOKENS_PER_ETH().then((tokensPerEth: string) => {
        console.log("Exchange Rate:", tokensPerEth);
        setExchangeRate(ethers.formatUnits(tokensPerEth, 0));
      }
      ).catch((error) => console.error("Error getting exchange rate:", error));
    }
  }, [signer, contract]);
  const handleRepeatClick = async () => {
    setIsETHFirst(!isETHFirst); // 切换 ETH 和 YD 的显示顺序
    if (signer && contract) {
      try {
        const tokenName = await contract.name();
        setName(tokenName);

        const tokenSymbol = await contract.symbol();
        setSymbol(tokenSymbol);

        const totalSupplyValue = await contract.totalSupply();
        const formattedSupply = ethers.formatUnits(totalSupplyValue, 0); // 假设有18位小数
        setTotalSupply(formattedSupply);

        const tokensPerEth = await contract.TOKENS_PER_ETH();
        const formattedRate = ethers.formatUnits(tokensPerEth, 0); // 假设有18位小数
        setExchangeRate(formattedRate);

      } catch (error) {
        console.error("Error fetching contract info:", error);
      }
    }
  }


  // 购买按钮点击事件
  const handleBuyClick = async () => {
    if (contract) {
      try {
        const remainingMintableSupply = await contract.remainingMintableSupply();
        const formattedMaxBuyAmount = ethers.formatUnits(remainingMintableSupply, 0); // 假设0小数位
        setMaxBuyAmount(formattedMaxBuyAmount);

        setModalMessage(`你最多可以购买 ${formattedMaxBuyAmount} YD，输入你想购买的数量。`);
        setShowModal(true); // 显示弹窗
      } catch (error) {
        console.error("Error fetching remaining mintable supply:", error);
      }
    }
  };


  // 关闭弹窗
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 确认购买
  const handleConfirmPurchase = async () => {
    if (!purchaseAmount || isNaN(Number(purchaseAmount))) {
      alert("请输入有效的数量！");
      return;
    }

    if (Number(purchaseAmount) > Number(maxBuyAmount)) {
      alert(`购买数量超过最大可购买数量(${maxBuyAmount})`);
      return;
    }

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
              {name}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Symbol</p>
            <p className="font-medium text-gray-900">
              {symbol}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600">Total Supply</p>
            <p className="font-medium text-blue-900">
              {totalSupply}
            </p>
          </div>
          <Coins className="w-6 h-6 text-blue-500" />
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-indigo-600">Maximum Supply</p>
            <p className="font-medium text-indigo-900">
              {maxSupply}
            </p>
          </div>
          <Coins className="w-6 h-6 text-indigo-500" />
        </div>

        <div className="bg-purple-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-600">Exchange Rate</p>
            <span className="text-sm text-purple-600">
              {isETHFirst ? '1 ETH =' : '1 YDT ='}
            </span>
            <span className="font-medium text-purple-900">
              {isETHFirst ? `${exchangeRate} YDT` : `${exchangeRate} ETH`}
            </span>
          </div>
          <Repeat onClick={handleRepeatClick} className="w-6 h-6 text-purple-500" />
        </div>
        <div className="text-center text-sm text-gray-500 mt-6">
          <button className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={handleBuyClick}>
            购买 YD 币
          </button>
        </div>
      </div>


      {/* 弹窗 */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">购买确认</h3>
            <p className="mb-4">{modalMessage}</p>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="请输入购买数量"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-black"
                onClick={handleCloseModal}
              >
                取消
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleConfirmPurchase}
              >
                确认购买
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenInfo;
