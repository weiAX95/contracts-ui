import React from 'react';
import { useAccount, useConnect, useDisconnect, useBalance, useContractRead } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { YiDengToken } from '@/abi';
const WalletConnect = () => {
    const { address, isConnected } = useAccount();
    const { connectAsync } = useConnect();
    const { disconnect } = useDisconnect();
    const { data: balance } = useBalance({
        address: address,
    });

    const handleConnect = async () => {
        try {
            // 检查是否安装了 MetaMask
            if (typeof window.ethereum === 'undefined') {
                alert('请先安装 MetaMask!');
                // 可以重定向到 MetaMask 下载页面
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
    // 读取合约余额
    const { data: tokenBalance } = useContractRead({
        address: contractAddress,
        abi: YiDengToken,
        functionName: 'balanceOf',
        args: [address], // 查询地址
        enabled: Boolean(address), // 只在地址存在时查询
    });
    //  0x5FbDB2315678afecb367f032d93F642f64180aa3

    if (isConnected) {
        return (
            <div className="p-4 rounded-lg border border-gray-200">
                <div className="mb-4">
                    <p className="text-sm text-gray-600">Connected Account</p>
                    <p className="font-mono text-sm">{address}</p>
                </div>

                {balance && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">Balance</p>
                        <p className="font-mono text-sm">
                            {balance.formatted} {balance.symbol}
                        </p>
                    </div>
                )}

                <button
                    onClick={() => disconnect()}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <div className="p-4">
            <button
                onClick={handleConnect}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                Connect Wallet
            </button>
        </div>
    );
};

export default WalletConnect;