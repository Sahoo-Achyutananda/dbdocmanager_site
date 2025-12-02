import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
           <div className="flex gap-0.5">
             <div className="w-2 h-2 rounded-full bg-purple-600"></div>
             <div className="w-2 h-2 rounded-full bg-purple-400"></div>
           </div>
           <span className="text-xl font-bold text-gray-900 tracking-tight">DBDocManager</span>
        </div>

        {/* Desktop Links - Moved to the corner with "Purple Vibe" */}
        <div className="hidden md:flex items-center gap-2">
          {['Home', 'DSL', 'DSL Editor'].map((item) => (
            <a 
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300 border border-transparent hover:border-purple-100"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 hover:text-purple-600 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-lg p-4 flex flex-col gap-3 md:hidden animate-in slide-in-from-top-5">
          <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors">Home</a>
          <a href="/dsl" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors">DSL</a>
          <a href="/editor" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors">DSL Editor</a>
        </div>
      )}
    </nav>
  );
}