'use client'
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

interface CodeSnippetProps {
  initialCode?: string;
  language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  initialCode = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
};

export default nextConfig;`, 
  language = 'typescript' 
}) => {
  const [code, setCode] = useState(initialCode);

  const handleExportPNG = async () => {
    const element = document.getElementById('code-snippet-container');
    if (element) {
      try {
        const canvas = await html2canvas(element, { 
          scale: 2,
          useCORS: true 
        });
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, 'code-snippet.png');
          }
        });
      } catch (error) {
        console.error('Export failed:', error);
      }
    }
  };

  return (
    <div className="flex h-screen w-full p-4 justify-center items-center">
        <div className='flex-1 w-full  mr-6 p-5  items-start justify-start '>
        <p className=' text-xl font-bold'>Write your Snippet here</p>
        <textarea
          className="w-full rounded-2xl mr-6 p-5 bg-[#000000]  font-mono text-sm resize-none outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
        />
        </div>
        
        <div className=' flex-1  w-full '>
        <div 
        id="code-snippet-container"
        className="rounded-4xl overflow-hidden border  bg-black p-8"
      >
        
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          customStyle={{
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <div className="flex justify-end space-x-2">
        <button 
          onClick={handleExportPNG}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export PNG
        </button>
      </div>
        </div>
     
    </div>
  );
};

export default CodeSnippet;