import React, { useState } from 'react';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { ethers } from 'ethers';
import CourseMarketABI from '@/abi/CourseMarket.json';
import YiDengTokenABI from '@/abi/YiDengToken.json';

const courseMarketAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
const tokenAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

const courses = [
    {
        web2CourseId: "react-101",
        title: "React 入门",
        description: "学习 React 基础，包括组件、状态管理等。",
        duration: "4小时",
        price: 100 // 假设该课程价格为100 YD
    },
    {
        web2CourseId: "tailwind-201",
        title: "TailwindCSS 实战",
        description: "快速掌握 TailwindCSS，构建响应式页面。",
        duration: "3小时",
        price: 200
    },
];

function Course() {
    const { address, isConnected } = useAccount();
    const [transactionStatus, setTransactionStatus] = useState("");

    // 使用 useReadContract 获取课程数量示例（可选）
    const { data: courseCountData } = useReadContract({
        abi: CourseMarketABI,
        address: courseMarketAddress,
        functionName: "courseCount",
    });

    // 写合约Hook
    const { data: approveHash, isPending: isApproving, writeContractAsync: approveAsync, error: approveError } = useWriteContract();
    const { data: purchaseHash, isPending: isPurchasing, writeContractAsync: purchaseAsync, error: purchaseError } = useWriteContract();

    // 在购买课程前先 approve
    async function approveAndPurchase(web2CourseId: string, price: number) {
        setTransactionStatus("授权中...");

        try {
            // 首先调用 approve，将 CourseMarket 合约地址授权给足够额度的 YD
            await approveAsync({
                address: tokenAddress,
                abi: YiDengTokenABI,
                functionName: 'approve',
                args: [courseMarketAddress, price], // 授权额度至少为课程价格
            });

            setTransactionStatus("授权成功，购买中...");

            // 授权成功后，再购买课程
            await purchaseAsync({
                address: courseMarketAddress,
                abi: CourseMarketABI,
                functionName: 'purchaseCourse',
                args: [web2CourseId],
            });

            setTransactionStatus("购买成功");
        } catch (err) {
            console.error("购买课程失败:", err);
            setTransactionStatus("购买课程失败");
        }
    }

    return (
        <div className="p-6 bg-gray-50">
            <h2 className="text-3xl font-semibold text-center mb-6">课程列表:({Number(courseCountData)})</h2>
            <div className='address'>address:{address} isConnected:{String(isConnected)} </div>

            {transactionStatus && <div className="mt-4 text-center">{transactionStatus}</div>}
            {approveError && <div className="mt-4 text-red-500">批准错误: {approveError.message}</div>}
            {purchaseError && <div className="mt-4 text-red-500">购买错误: {purchaseError.message}</div>}

            <div className="space-y-4 mt-6">
                {courses.map((course) => (
                    <div
                        key={course.web2CourseId}
                        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                        <p className="text-gray-600 mt-2">课程ID: {course.web2CourseId}</p>
                        <p className="text-gray-600 mt-2">{course.description}</p>
                        <p className="text-gray-500 mt-2">时长: {course.duration}</p>
                        <p className="text-gray-500 mt-2">价格: {course.price} YD</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                            onClick={() => approveAndPurchase(course.web2CourseId, course.price)}
                            disabled={isApproving || isPurchasing}
                        >
                            {isApproving ? '授权中...' : isPurchasing ? '购买中...' : '购买课程'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Course;
