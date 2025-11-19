import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, ArrowRight, Menu, X, Database, Layout, GitBranch, ChevronDown } from 'lucide-react';
import { Navbar } from '../components/Navbar';
// Placeholder for the dashboard image if the user doesn't have one, 
// effectively mocking the look in the photo.
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

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center gap-2 cursor-pointer">
//            {/* Icon imitating the dots in the logo */}
//            <div className="flex gap-0.5">
//              <div className="w-2 h-2 rounded-full bg-purple-600"></div>
//              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
//            </div>
//            <span className="text-xl font-bold text-gray-900 tracking-tight">DBDocManager</span>
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
//           <a href="#" className="hover:text-gray-900 transition-colors">Home</a>
//           <a href="#" className="hover:text-gray-900 transition-colors">Features</a>
//           <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
//           <div className="flex items-center gap-1 hover:text-gray-900 transition-colors cursor-pointer">
//             <span>Pages</span>
//             <ChevronDown size={14} />
//           </div>
//         </div>

//         {/* CTA Button */}
//         <div className="hidden md:block">
//           <a 
//             href="/download" 
//             className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
//           >
//             Get Started <ArrowRight size={16} />
//           </a>
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg p-4 flex flex-col gap-4 md:hidden">
//           <a href="#" className="text-gray-600 font-medium">Home</a>
//           <a href="#" className="text-gray-600 font-medium">Features</a>
//           <a href="#" className="text-gray-600 font-medium">Pricing</a>
//           <a href="/download" className="bg-gray-900 text-white px-4 py-2 rounded-full text-center text-sm font-medium">Get Started</a>
//         </div>
//       )}
//     </nav>
//   );
// };

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden">
      
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        
        {/* The "Glow" Background Effect from the photo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
            Your Committed Partner in <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600">
              Data Documentation
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create, visualize, and maintain your relational & NoSQL data mappings using a simple DSL. Generate documentation and lineage in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-black transition-all hover:scale-105 shadow-xl shadow-purple-900/10 flex items-center justify-center gap-2 group">
              Get Started 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all hover:border-gray-300 flex items-center justify-center gap-2">
              Learn More
            </button>
          </div>

          {/* Dashboard Image / Mockup */}
          <div className="relative mx-auto max-w-5xl mt-12">
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
               <DashboardMockup />
            </div>
            
            {/* Floating badge decoration */}
            <div className="hidden md:flex absolute -right-12 top-20 bg-white p-3 rounded-xl shadow-xl border border-gray-100 items-center gap-3 animate-bounce-slow">
               <div className="bg-green-100 p-2 rounded-lg">
                 <CheckCircle size={20} className="text-green-600" />
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
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="mb-6 bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
          <div className="bg-gray-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Abstract shapes in background of video section */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600/20 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                See DBDocManager in Action
              </h3>
              
              <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl group cursor-pointer">
                {/* Placeholder for video thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                   <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg">
                        <Play className="text-purple-600 fill-purple-600" size={24} />
                      </div>
                   </div>
                </div>
                {/* Actual video element would go here */}
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover opacity-80"
                />
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