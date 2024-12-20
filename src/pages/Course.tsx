
import React, { useState, useEffect } from "react";
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt, type BaseError, type Config, useConnectorClient } from 'wagmi';
import { ethers, BrowserProvider, JsonRpcSigner } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem'
import CourseMarket from '@/abi/CourseMarket.json';
import {
    type WriteContractData,
    type WriteContractVariables,
    type WriteContractMutate,
    type WriteContractMutateAsync,
    writeContractMutationOptions,
} from 'wagmi/query'

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
    const [isLoadingCourses, setIsLoadingCourses] = useState(false); // 是否在加载课程列表
    const { data: hash, isPending, writeContractAsync, error } = useWriteContract()
    const [transactionStatus, setTransactionStatus] = useState(""); // 交易状态信息

    //  課程title 
    const [title, setTitle] = useState('');
    //  課程description
    const [description, setDescription] = useState('');
    //  課程duration
    const [duration, setDuration] = useState('');
    //  課程price
    const [price, setPrice] = useState('');

    const { data: courseCountData } = useReadContract({
        abi: CourseMarket,
        address: contractAddress,
        functionName: "courseCount",
    });

    console.log(courseCountData, 'zzzzzzzzzz');



    async function addCourse() {
        setTransactionStatus("添加课程中...");

        try {

            const result = await writeContractAsync({
                address: contractAddress,
                abi: CourseMarket,
                functionName: 'addCourse',
                args: [web2CourseId, title, price,],
            });
            console.log('交易成功:', result);
        } catch (error) {
            console.error("添加课程失败:", error);
            setTransactionStatus("添加课程失败");
        }
    }




    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    return (
        <div className="p-6 bg-gray-50">
            <h2 className="text-3xl font-semibold text-center mb-6">课程列表:({Number(courseCountData)})</h2>
            <div className='address'>address:{address} isConnected:{isConnected} </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none" onClick={addCourse}>
                {isPending ? '添加中...' : '添加课程'}
            </button>
            {/* 输入课程 id和description和title和duration 添加课程*/}
            <div>
                <input
                    type="text"
                    placeholder="课程id"
                    value={web2CourseId}
                    onChange={(e) => setWeb2CourseId(e.target.value)}
                    className="mt-4 px-4 py-2 border border-gray-300 rounded focus:outline-none"
                />
            </div>
            <div>
                <input type="text" placeholder="课程标题" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-4 px-4 py-2 border border-gray-300 rounded focus:outline-none" />
            </div>
            <div>
                <input type="text" placeholder="课程描述" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-4 px-4 py-2 border border-gray-300 rounded focus:outline-none" />
            </div>
            <div>
                <input type="text" placeholder="课程时长" value={duration} onChange={(e) => setDuration(e.target.value)} className="mt-4 px-4 py-2 border border-gray-300 rounded focus:outline-none" />
            </div>
            {/* 价格 */}
            <div>
                <input
                    type="text"
                    placeholder="价格"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-4 px-4 py-2 border border-gray-300 rounded focus:outline-none"
                />
            </div>
            {isLoadingCourses && <div>加载中...</div>}


            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {transactionStatus && <div className="mt-4 text-center">{transactionStatus}</div>}
            {error && <div className="mt-4 text-red-500">错误: {(error as BaseError).shortMessage || error.message}</div>}
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
        </div >
    );
};

export default Course;
