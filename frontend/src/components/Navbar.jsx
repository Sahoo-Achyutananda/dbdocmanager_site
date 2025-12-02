
import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, ArrowRight, Menu, X, Database, Layout, GitBranch, ChevronDown } from 'lucide-react';

export function Navbar() {
  // return (
  //   <nav className="w-full bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow">
  //     <h1 className="text-xl font-bold">DBDocManager</h1>

  //     <div className="space-x-6 font-medium">
  //       <a href="/" className="hover:text-green-200">Home</a>
  //       <a href="/docs" className="hover:text-green-200">Documentation</a>
  //       <a href="/download" className="hover:text-green-200">Download</a>
  //       <a href="/editor" className="hover:text-green-200">Live Editor</a>
  //     </div>
  //   </nav>
  // );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
           <div className="flex gap-0.5">
             <div className="w-2 h-2 rounded-full bg-purple-600"></div>
             <div className="w-2 h-2 rounded-full bg-purple-400"></div>
           </div>
           <span className="text-xl font-bold text-gray-900 tracking-tight">DBDocManager</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
          <a href="/features" className="hover:text-gray-900 transition-colors">Features</a>
          <a href="/docs" className="hover:text-gray-900 transition-colors">Docs</a>
          <a href="/dsl" className="hover:text-gray-900 transition-colors">DSL</a>
          <a href="/editor" className="hover:text-gray-900 transition-colors">DSL Editor</a>
          
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a 
            href="/download" 
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Get Started <ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg p-4 flex flex-col gap-4 md:hidden">
          <a href="#" className="text-gray-600 font-medium">Home</a>
          <a href="#" className="text-gray-600 font-medium">Features</a>
          <a href="#" className="text-gray-600 font-medium">Pricing</a>
          <a href="/download" className="bg-gray-900 text-white px-4 py-2 rounded-full text-center text-sm font-medium">Get Started</a>
        </div>
      )}
    </nav>
  );
}
