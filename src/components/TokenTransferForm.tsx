import React, { useState } from 'react';

const TransferForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // 构建转账交易
      const transactionParameters = {
        to: formData.address,
        from: accounts[0],
        value: '0x' + (Number(formData.amount) * 1e18).toString(16), // 转换为wei
      };

      // 发送交易
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      alert(`交易已发送: ${txHash}`);
      setFormData({ address: '', amount: '' });
    } catch (error) {
      console.error('转账失败:', error);
      alert('转账失败: ' + (error as Error).message);
    } finally {
      setLoading(false);
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
            ${
              loading || !formData.address || !formData.amount
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 transition-colors'
            }`}
        >
          {loading ? '处理中...' : '确认转账'}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        <p>注意事项：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>请仔细核对接收地址</li>
          <li>确保钱包余额充足</li>
          <li>需要支付gas费用</li>
        </ul>
      </div>
    </div>
  );
};

export default TransferForm;
