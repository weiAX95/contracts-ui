import React, { useState } from 'react';

const TokenPurchase = () => {
    const [formData, setFormData] = useState({
        ethAmount: '',
        tokenAmount: '',
    });
    const [loading, setLoading] = useState(false);
    const [rate] = useState(1000); // 假设1 ETH = 1000 代币

    // 处理ETH输入，自动计算可获得的代币数量
    const handleEthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ethValue = e.target.value;
        setFormData({
            ethAmount: ethValue,
            tokenAmount: ethValue ? (parseFloat(ethValue) * rate).toString() : '',
        });
    };

    // 处理代币输入，自动计算需要的ETH数量
    const handleTokenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tokenValue = e.target.value;
        setFormData({
            ethAmount: tokenValue ? (parseFloat(tokenValue) / rate).toString() : '',
            tokenAmount: tokenValue,
        });
    };

    const handlePurchase = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!window.ethereum) {
            alert('请先安装MetaMask!');
            return;
        }

        try {
            setLoading(true);
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            // 这里需要替换为你的代币合约地址
            const contractAddress = 'YOUR_CONTRACT_ADDRESS';

            // 构建购买交易
            const transactionParameters = {
                to: contractAddress,
                from: accounts[0],
                value: '0x' + (Number(formData.ethAmount) * 1e18).toString(16), // 转换为wei
                // 如果需要调用合约方法，添加data字段
                // data: 'YOUR_CONTRACT_BUY_METHOD'
            };

            // 发送交易
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });

            alert(`购买交易已发送: ${txHash}`);
            setFormData({ ethAmount: '', tokenAmount: '' });
        } catch (error) {
            console.error('购买失败:', error);
            alert('购买失败: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                购买代币
            </h2>

            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="text-blue-600">当前汇率</span>
                    <span className="font-medium text-blue-600">1 ETH = {rate} Token</span>
                </div>
            </div>

            <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">支付 ETH 数量</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={formData.ethAmount}
                            onChange={handleEthInput}
                            placeholder="0.0"
                            step="0.000000000000000001"
                            min="0"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <span className="absolute right-3 top-2 text-gray-500">ETH</span>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <span className="text-gray-500">↕️</span>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">获得代币数量</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={formData.tokenAmount}
                            onChange={handleTokenInput}
                            placeholder="0.0"
                            min="0"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <span className="absolute right-3 top-2 text-gray-500">TOKEN</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !formData.ethAmount || parseFloat(formData.ethAmount) <= 0}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${loading || !formData.ethAmount || parseFloat(formData.ethAmount) <= 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 transition-colors'
                        }`}
                >
                    {loading ? '处理中...' : '确认购买'}
                </button>
            </form>

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
