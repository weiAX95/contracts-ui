import React, { useState, useEffect } from 'react';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // 获取交易历史
  interface Transaction {
    id: number;
    hash: string;
    from: string;
    to: string;
    value: string;
    status: string;
    timestamp: number;
  }

  const fetchTransactions = async (): Promise<void> => {
    try {
      setLoading(true);

      // 检查是否安装了 MetaMask
      if (!window.ethereum) {
        throw new Error('请安装 MetaMask!');
      }

      // 获取当前连接的账户
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('未连接钱包');
      }

      const currentAddress: string = accounts[0];

      // 获取交易记录
      // 这里使用一个模拟的数据，实际项目中你需要替换为真实的API调用
      const mockTransactions: Transaction[] = Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        hash: `0x${(Math.random() * 1e50).toString(16)}`,
        from: currentAddress,
        to: `0x${(Math.random() * 1e40).toString(16)}`,
        value: (Math.random() * 10).toFixed(4),
        status: Math.random() > 0.2 ? '成功' : '失败',
        timestamp: Date.now() - Math.random() * 1000000000,
      }));

      setTransactions(mockTransactions);
      setTotalPages(Math.ceil(mockTransactions.length / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('获取交易历史失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 在组件加载时获取交易历史
  useEffect(() => {
    fetchTransactions();
  }, []);

  // 分页处理
  const getCurrentPageData = () => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return transactions.slice(start, end);
  };

  // 格式化时间戳
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  // 格式化地址显示
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // 刷新交易历史
  const handleRefresh = () => {
    fetchTransactions();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">交易历史</h2>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          刷新
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">加载中...</div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">暂无交易记录</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">时间</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    交易哈希
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">发送方</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">接收方</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">金额</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getCurrentPageData().map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{formatTimestamp(tx.timestamp)}</td>
                    <td className="px-4 py-3 text-sm text-blue-500">{formatAddress(tx.hash)}</td>
                    <td className="px-4 py-3 text-sm">{formatAddress(tx.from)}</td>
                    <td className="px-4 py-3 text-sm">{formatAddress(tx.to)}</td>
                    <td className="px-4 py-3 text-sm">{tx.value} ETH</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          tx.status === '成功'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              上一页
            </button>
            <span>
              第 {currentPage} 页，共 {totalPages} 页
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              下一页
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
