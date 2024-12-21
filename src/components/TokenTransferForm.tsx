import React, { useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useSimulateContract, useWriteContract, } from 'wagmi';
import YiDengToken from '@/abi/YiDengToken.json';

const TransferForm = () => {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    address: '',
    amount: '',
    tokenAmount: ''
  });
  const [loading, setLoading] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(false);


  const isValidAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!window.ethereum) {
      alert('请先安装MetaMask!');
      return;
    }
    if (!isValidAddress(formData.address)) {
      alert('无效地址');
      return;
    }
    try {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const transactionParameters = {
        to: formData.address as `0x${string}`,
        from: accounts[0],
        value: parseEther(formData.amount)
      };

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      alert(`交易已发送: ${txHash}`);
      setFormData({ address: '', amount: '', tokenAmount: '' });
    } catch (error) {
      console.error('转账失败:', error);
      alert('转账失败: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleTokenTransfer = async () => {
    if (!address) {
      alert('请先连接钱包');
      return;
    }

    if (!formData.tokenAmount || !formData.address) {
      alert('请填写完整的转账信息');
      return;
    }
    const { data: simulateData } = useSimulateContract({
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`,
      abi: YiDengToken,
      functionName: 'transfer',
      args: formData.address && formData.tokenAmount ? [
        formData.address as `0x${string}`,
        parseEther(formData.tokenAmount)
      ] : undefined,
      //  enabled: Boolean(formData.address && formData.tokenAmount)
    });

    const { writeContract } = useWriteContract();


    if (!simulateData?.request) return;

    try {
      setTokenLoading(true);
      await writeContract(simulateData.request);
      setFormData(prev => ({ ...prev, tokenAmount: '' }));
    } catch (error) {
      console.error('代币转账失败:', error);
      alert('代币转账失败');
    } finally {
      setTokenLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">💸</span>
        转账
      </h2>

      <form onSubmit={handleTransfer} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">接收地址</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="0x..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            pattern="^0x[a-fA-F0-9]{40}$"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">转账金额 (ETH)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="0.0"
            step="0.000000000000000001"
            min="0"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !formData.address || !formData.amount}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
           ${loading || !formData.address || !formData.amount
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 transition-colors'
            }`}
        >
          {loading ? '处理中...' : '确认转账'}
        </button>
      </form>

      <div className="pt-6 border-t">
        <h3 className="text-lg font-semibold mb-4">YiDeng代币转账</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">接收地址</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="0x..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              pattern="^0x[a-fA-F0-9]{40}$"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">代币数量</label>
            <input
              type="number"
              name="tokenAmount"
              value={formData.tokenAmount}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleTokenTransfer}
            disabled={tokenLoading || !formData.address || !formData.tokenAmount}
            className={`w-full py-2 px-4 rounded-md text-white font-medium
             ${tokenLoading || !formData.address || !formData.tokenAmount
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600 transition-colors'
              }`}
          >
            {tokenLoading ? '处理中...' : '确认转账代币'}
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>注意事项：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>请仔细核对接收地址</li>
            <li>确保钱包余额充足</li>
            <li>需要支付gas费用</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;