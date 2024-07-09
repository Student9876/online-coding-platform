"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import Head from 'next/head';


const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });

const OnlineIDE = () => {
    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleRunCode = async () => {
        const apiRoute = language === 'cpp' ? '/api/compile/cpp' : '/api/compile/python';

        try {
            const response = await fetch(apiRoute, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, input }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                setOutput(`Error: ${errorData.error}\nDetails: ${errorData.details}`);
            } else {
                const data = await response.json();
                setOutput(data.output);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setOutput(`Unexpected error: ${error.toString()}`);
        }
    };

    function changeLanguage(e) {
        setLanguage(e.target.value);
        setCode('');
    }

    return (
        <main>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/theme/material.min.css"
                />
            </Head>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Online IDE</h1>
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left Side */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                                    Select Language
                                </label>
                                <select
                                    id="language"
                                    name="language"
                                    value={language}
                                    onChange={(e) => changeLanguage(e)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="cpp">C++</option>
                                    <option value="python">Python</option>
                                </select>
                            </div>
                            <button
                                onClick={handleRunCode}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Run Code
                            </button>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                Code
                            </label>
                            <div className="border rounded-md h-96">
                                <CodeMirror
                                    value={code}
                                    options={{
                                        mode: language === 'cpp' ? 'text/x-c++src' : 'python',
                                        theme: 'material',
                                        lineNumbers: true,
                                        viewportMargin: Infinity,
                                    }}
                                    onChange={(value) => {
                                        setCode(value);
                                    }}
                                    className="mt-1 h-full lg:w-[800px] md:w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex-1">
                        <div className="mb-4">
                            <label htmlFor="input" className="block text-sm font-medium text-gray-700">
                                Custom Input
                            </label>
                            <textarea
                                id="input"
                                name="input"
                                rows={10}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="output" className="block text-sm font-medium text-gray-700">
                                Output
                            </label>
                            <textarea
                                id="output"
                                name="output"
                                rows={10}
                                value={output}
                                readOnly
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OnlineIDE;