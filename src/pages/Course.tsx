
import React, { useState } from "react";

import { useAccount, useContractWrite, } from 'wagmi';
import { ethers } from 'ethers';
import { CourseCertificate } from '@/abi/index';

// 合约地址
const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

const courses = [
    {
        id: 1,
        title: "React 入门",
        description: "学习 React 基础，包括组件、状态管理等。",
        duration: "4小时",
    },
    {
        id: 2,
        title: "TailwindCSS 实战",
        description: "快速掌握 TailwindCSS，构建响应式页面。",
        duration: "3小时",
    },
    {
        id: 3,
        title: "JavaScript 高级",
        description: "深入学习 JavaScript，理解闭包、原型链等。",
        duration: "5小时",
    },
];


const Course = () => {
    const { address, isConnected } = useAccount();  // 获取当前连接的钱包地址
    const [web2CourseId, setWeb2CourseId] = useState('');
    const [hasPurchased, setHasPurchased] = useState(null);


    // 使用 wagmi 的 useContract hook 初始化合约
    // const contract = useContract({
    //     addressOrName: contractAddress,
    //     contractInterface: contractABI,
    // });

    return (
        <div className="p-6 bg-gray-50">
            <h2 className="text-3xl font-semibold text-center mb-6">课程列表</h2>
            <div className="space-y-4">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                        <p className="text-gray-600 mt-2">课程id:{course.id}</p>
                        <p className="text-gray-600 mt-2">{course.description}</p>
                        <p className="text-gray-500 mt-2">时长: {course.duration}</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none">
                            查看详情
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Course;
