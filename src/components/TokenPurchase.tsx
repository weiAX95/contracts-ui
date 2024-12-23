import React, { useState, useEffect } from 'react';

// import { YiDengToken, YiDengToken__factory } from '@/abi/index';
// import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
const TokenPurchase = () => {
    // const [balance, setBalance] = useState<string | null>(null);
    const [, setAddress] = useState<string | null>(null); // 添加 address 状态

    useEffect(() => {
        const fetchBalance = async () => {
            const provider = new Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts(); // 获取用户的账户列表
            const userAddress = accounts[0]; // 选择第一个账户
            setAddress(userAddress); // 设置用户地址
            const gasPrice = await provider.getGasPrice();
            console.log(gasPrice, 'gas'); // 获取当前的 gas 价格
            if (userAddress) {
                const balance = await provider.getBalance(userAddress);
                console.log(balance);
                // setBalance(ethers.utils.formatEther(balance)); // 以以太为单位
            }
        };

        if (window.ethereum) {
            fetchBalance();
        } else {
            console.log('Please install MetaMask!');
        }
    }, []);
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                购买代币
            </h2>

            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="text-blue-600">当前汇率</span>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                <p>购买说明：</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>最小购买数量：0.01 ETH</li>
                    <li>交易确认可能需要几分钟</li>
                    <li>需要支付gas费用</li>
                    <li>代币将直接发送到您的钱包地址</li>
                </ul>
            </div>
        </div>
    );
};

export default TokenPurchase;
