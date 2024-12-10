'use client'
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { toPng } from 'html-to-image';

interface CodeSnippetProps {
  initialCode?: string;
  language?: string;
}

const Home: React.FC<CodeSnippetProps> = ({ 
  initialCode = `import CodeSnippet from "@/Components/CodeSnippet";

export default function Home() {
  return (
    <div className=" h-screen w-full">
        <CodeSnippet />
    </div>
  );
}`, 
  language = 'typescript' 
}) => {
  const [code, setCode] = useState(initialCode);

  const handleExportPNG = async () => {
    const element = document.getElementById('code-snippet-container');
    
    if (element) {
      try {
        window.scrollTo(0, 0);
        const dataUrl = await toPng(element, {
          quality: 1.0,
          pixelRatio: 2,
          skipAutoScale: true,
          cacheBust: true,
          style: {
            transform: 'scale(1)', // Prevents scaling issues
            display: 'block', // Removes white space
          }
        });
        const link = document.createElement('a');
        link.download = 'code-snippet.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Export failed:', error);
      }
    }
  };
  return (
    <div className="flex h-screen w-full p-4 justify-center items-center">
    <div className='flex-1 w-full mr-6 p-5 items-start justify-start'>
      <p className='text-xl font-bold'>Write your Snippet here</p>
      <textarea
        className="w-full rounded-2xl mr-6 p-5 bg-[#000000] text-white font-mono text-sm resize-none outline-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
      />
    </div>
    
    <div className='flex-1 w-full'>
      <div 
        id="code-snippet-container"
        className="relative rounded-none bg-black"
        style={{ 
          transform: 'translateZ(0)', // Forces pixel-perfect rendering
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Top section with the plus */}
        <div className='flex '>
          <div className=' border-[#191919] border-[0.1px] border-l-0 border-t-0 h-16 w-16 flex items-center justify-center'/>
          <span className= " absolute top-[45px] left-[53px] text-[#515257] text-base">___</span>
          <span className= " absolute top-[50px] left-[61px] text-[#515257] text-lg">|</span>
          

          <div className=' border-[#191919] border-[0.1px] border-l-0  border-t-0 h-16 flex-grow'/>
          <div className=' border-[#191919] border-[0.1px] border-r-0 border-l-0 border-t-0 h-16 w-16'/>
        </div>
  
        {/* Middle section */}
        <div className='flex'>
          <div className=' border-[#191919] border-l-0 border-t-0 border-r-0  border-[0.1px] w-16'/>
          <div className=' border-[0.1px] flex-grow border-t-0  border-[#191919] p-6'>
            <SyntaxHighlighter
              language={language}
              style={atomOneDarkReasonable}
              customStyle={{
                backgroundColor: 'transparent',
                padding: 0,
                margin: 0,
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
          <div className=' border-[#191919] border-l-0 border-t-0 border-[0.1px] border-r-0 w-16'/>
        </div>
        
        {/* Bottom section with the plus */}
        <div className='flex relative'>
          <div className=' border-[#191919] border-[0.1px] border-t-0 border-r-0 border-l-0 border-b-0 h-16 w-16'/>
          <span className= " absolute bottom-[58px] right-[53px] text-[#515257] text-base">___</span>
          <span className= " absolute bottom-[49px] right-[61px] text-[#515257] text-lg">|</span>
          <div className=' border-[#191919] border-[0.1px] border-b-0 border-t-0 h-16 flex-grow'/>
          <div className='  h-16 w-16 flex items-center justify-center'/>
        </div>
      </div>
      <div className="flex mt-3 justify-end space-x-2">
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

export default Home;

