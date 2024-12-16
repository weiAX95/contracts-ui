import React, { useState } from 'react';
import { ethers } from 'ethers';

const TokenSale = () => {
    // 设置用户的输入和状态
    const [ethAmount, setEthAmount] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 智能合约地址和 ABI
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // 替换为你的合约地址

    // 设置 provider 和 signer
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(provider.provider);
    console.log(provider.provider);
    console.log(provider.getSigner()), 1;

    // 连接钱包
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                alert('Wallet connected');
            } catch (error) {
                alert('Wallet connection failed');
            }
        } else {
            alert('Please install MetaMask');
        }
        // 处理购买代币
        const handleBuyTokens = async () => {
        };

    };

    function handleBuyTokens(event: React.MouseEvent<HTMLButtonElement>) {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="token-sale">
            <h2>Buy YiDeng Tokens</h2>

            <button onClick={connectWallet}>Connect Wallet</button>

            <div>
                <input
                    type="number"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    placeholder="Amount in ETH"
                />
            </div>

            <button onClick={handleBuyTokens} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Buy Tokens'}
            </button>

            {transactionStatus && <p>{transactionStatus}</p>}
        </div>
    );
};

export default TokenSale;
