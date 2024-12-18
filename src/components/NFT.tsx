import React, { useState } from 'react';
import { useWriteContract, useSimulateContract } from 'wagmi';
import CourseCertificate from '@/abi/CourseCertificate.json';
const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';


function MintCertificate() {
    const [student, setStudent] = useState('');
    const [courseId, setCourseId] = useState(1);
    const [metadataURI, setMetadataURI] = useState('');

    const res = useSimulateContract({
        address: contractAddress,
        abi: CourseCertificate,
        functionName: 'mintCertificate',
        args: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", courseId, metadataURI],
    });
    const { writeContract } = useWriteContract();

    const handleMint = () => {
        if (res.data?.request) {
            const result = writeContract(res.data!.request)
            console.log(result);

        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="学生地址"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
            />
            <input
                type="text"
                placeholder="课程 ID"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value as unknown as number)}
            />
            <input
                type="text"
                placeholder="元数据 URI"
                value={metadataURI}
                onChange={(e) => setMetadataURI(e.target.value)}
            />
            <button onClick={handleMint} >
                {'铸造证书'}
            </button>
            {/* <p>证书铸造成功！</p> */}
        </div>
    );
}

export default MintCertificate;
