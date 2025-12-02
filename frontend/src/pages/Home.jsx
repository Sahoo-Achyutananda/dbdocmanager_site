import React, { useState } from 'react';
import { Play, CheckCircle, Layout, Database, GitBranch, Copy, Check } from 'lucide-react';
import { Navbar } from '../components/Navbar';

// Placeholder for the dashboard image
const DashboardMockup = () => (
  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden w-full">
    {/* Fake Browser Header */}
    <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-400"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
      <div className="w-3 h-3 rounded-full bg-green-400"></div>
      <div className="ml-4 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-400 w-64 flex items-center">
        dbdocmanager.com/dashboard
      </div>
    </div>
    {/* Fake Dashboard Content */}
    <div className="p-6 grid grid-cols-3 gap-6 h-[400px] bg-slate-50/50">
      {/* Sidebar */}
      <div className="col-span-1 bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex flex-col gap-3">
        <div className="h-2 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="h-8 w-full bg-purple-50 rounded text-purple-600 text-sm flex items-center px-3 font-medium">Overview</div>
        <div className="h-8 w-full bg-white hover:bg-gray-50 rounded text-gray-500 text-sm flex items-center px-3">Tables</div>
        <div className="h-8 w-full bg-white hover:bg-gray-50 rounded text-gray-500 text-sm flex items-center px-3">Relationships</div>
        <div className="mt-auto h-32 bg-gray-50 rounded border border-dashed border-gray-200"></div>
      </div>
      {/* Main Content */}
      <div className="col-span-2 flex flex-col gap-4">
        <div className="flex gap-4">
           <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-xs text-gray-400 uppercase font-semibold mb-2">Total Tables</div>
              <div className="text-2xl font-bold text-gray-800">142</div>
           </div>
           <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-xs text-gray-400 uppercase font-semibold mb-2">Foreign Keys</div>
              <div className="text-2xl font-bold text-gray-800">389</div>
           </div>
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
           <div className="flex items-end justify-between h-full pb-4 px-4 gap-2">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75].map((h, i) => (
                <div key={i} className="w-full bg-purple-100 rounded-t-sm hover:bg-purple-200 transition-colors" style={{ height: `${h}%` }}></div>
              ))}
           </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [copied, setCopied] = useState(false);
  const installCommand = "npm install -g dbdocmanager_ssd";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden">
      
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        
        {/* The "Glow" Background Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
            Your Committed Partner in <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-purple-700 to-pink-600">
              Data Documentation
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create, visualize, and maintain your relational & NoSQL data mappings using a simple DSL. Generate documentation and lineage in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            
            {/* NPM Install Button - Matches Purple Vibe */}
            <div 
              className="group relative flex items-center bg-[#1e1b4b] hover:bg-[#2e1065] text-white rounded-full p-1 pr-6 shadow-xl shadow-purple-900/20 hover:shadow-purple-900/40 hover:scale-105 transition-all cursor-pointer border border-purple-900/50" 
              onClick={handleCopy}
            >
              <div className="bg-[#4c1d95] rounded-full p-3 mr-3 group-hover:bg-[#5b21b6] transition-colors">
                <span className="font-mono text-sm text-purple-100 font-bold">&gt;_</span>
              </div>
              <code className="font-mono text-sm mr-4 text-purple-50">{installCommand}</code>
              {copied ? (
                <Check size={18} className="text-green-400" />
              ) : (
                <Copy size={18} className="text-purple-300 group-hover:text-white transition-colors" />
              )}
            </div>

            {/* Learn More Button - Matches Purple Vibe */}
            <a 
              href="https://www.npmjs.com/package/dbdocmanager_ssd" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto bg-white text-purple-700 border border-purple-200 px-8 py-4 rounded-full font-medium hover:bg-purple-50 hover:border-purple-300 hover:text-purple-900 transition-all hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              Learn More
            </a>
          </div>

          {/* Dashboard Image / Mockup */}
          <div className="relative mx-auto max-w-5xl mt-12">
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
               <DashboardMockup />
            </div>
            
            {/* Floating badge decoration */}
            <div className="hidden md:flex absolute -right-12 top-20 bg-white p-3 rounded-xl shadow-xl border border-gray-100 items-center gap-3 animate-bounce-slow">
               <div className="bg-purple-100 p-2 rounded-lg">
                 <CheckCircle size={20} className="text-purple-600" />
               </div>
               <div>
                 <div className="text-xs text-gray-400 font-semibold uppercase">Status</div>
                 <div className="text-sm font-bold text-gray-800">Documented</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features You Will Love</h3>
            <p className="text-gray-500">Streamline your database documentation process with tools designed for clarity and speed.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layout className="text-purple-600" size={32} />,
                title: "DSL Editor",
                desc: "Write structured DSL to define sources, targets, and mappings with intelligent syntax highlighting."
              },
              {
                icon: <Database className="text-pink-500" size={32} />,
                title: "ERD Generation",
                desc: "Instantly generate beautiful Entity Relationship Diagrams directly from your model definitions."
              },
              {
                icon: <GitBranch className="text-orange-500" size={32} />,
                title: "Lineage View",
                desc: "Track column-level lineage from source to target to understand data flow and dependencies."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300 group">
                <div className="mb-6 bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-50">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1e1b4b] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Abstract shapes in background of video section */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600/20 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                See DBDocManager in Action
              </h3>
              
              <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                {/* YouTube Video Embed */}
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/g6TleEwgoQQ" 
                  title="DBDocManager Demo"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="flex gap-0.5">
               <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
             </div>
             <span className="font-bold text-gray-900">DBDocManager</span>
          </div>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} DBDocManager — All Rights Reserved.</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
}