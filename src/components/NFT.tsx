import React, { useState, useEffect } from 'react';
import { useWriteContract } from 'wagmi';
import CourseCertificate from '@/abi/CourseCertificate.json';

const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

function MintCertificate() {
  const [student, setStudent] = useState('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  const [courseId, setCourseId] = useState('zxc');
  const [metadataURI, setMetadataURI] = useState('');
  const [tokenId, setTokenId] = useState<number | null>(null);

  const { writeContract, isPending, error, data, isSuccess } = useWriteContract();

  const handleMint = async () => {
    if (!student || !courseId || !metadataURI) {
      alert('请确保所有输入项都填写完整！');
      return;
    }

    const formattedCourseId = courseId.toString();

    // 防止重复提交
    if (isPending) {
      alert('当前有交易正在处理，请稍后再试');
      return;
    }
    const blockNumber = await window.ethereum.request({ method: 'eth_blockNumber' });
    try {
      writeContract({
        address: contractAddress,
        abi: CourseCertificate,
        functionName: 'mintCertificate',
        args: [student, formattedCourseId, metadataURI],
        nonce: blockNumber,
      });

      alert('交易已提交，请等待区块确认！');
    } catch (e) {
      console.error('铸造失败:', e);
      alert('铸造失败，请检查控制台日志！');
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      // 假设返回的数据中包含 tokenId
      debugger;
      const newTokenId = parseInt(data?.toString() || '0'); // 将字符串转换为数字
      setTokenId(newTokenId);
      alert('铸造成功！');
    } else if (error) {
      alert(`交易失败: ${error.message}`);
    }
  }, [isSuccess, error, data]);

  return (
    <div>
      <h3>铸造证书</h3>
      <input
        type="text"
        placeholder="学生地址"
        value={student}
        onChange={e => setStudent(e.target.value)}
      />
      <input
        type="text"
        placeholder="课程 ID"
        value={courseId}
        onChange={e => setCourseId(e.target.value)}
      />
      <input
        type="text"
        placeholder="元数据 URI"
        value={metadataURI}
        onChange={e => setMetadataURI(e.target.value)}
      />
      <button onClick={handleMint} disabled={isPending}>
        {isPending ? '铸造中...' : '铸造证书'}
      </button>
      {error && <p style={{ color: 'red' }}>错误: {error.message}</p>}
      {tokenId && <p>证书铸造成功！Token ID: {tokenId}</p>}
    </div>
  );
}

export default MintCertificate;
