import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ArrowRight, 
  GitBranch, 
  FileJson, 
  CheckCircle, 
  Menu, 
  X, 
  ChevronRight, 
  Code,
  Layers,
  Activity
} from 'lucide-react';

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
// --- Components ---

// const Navbar = ({ activeSection, scrollToSection }) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { name: 'Home', id: 'hero' },
//     { name: 'Features', id: 'features' },
//     { name: 'JSON DSL', id: 'dsl' },
//     { name: 'Examples', id: 'examples' },
//   ];

//   return (
//     <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
//       <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
//         <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 cursor-pointer" onClick={() => scrollToSection('hero')}>
//           <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center text-white">
//             <Database size={18} />
//           </div>
//           DBDoc<span className="text-slate-400 font-normal">Manager</span>
//         </div>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <button 
//               key={link.name}
//               onClick={() => scrollToSection(link.id)}
//               className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
//             >
//               {link.name}
//             </button>
//           ))}
//           <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
//             Get Started <ArrowRight size={16} />
//           </button>
//         </div>

//         {/* Mobile Toggle */}
//         <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//           {mobileMenuOpen ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg p-6 md:hidden flex flex-col gap-4">
//           {navLinks.map((link) => (
//             <button 
//               key={link.name}
//               onClick={() => {
//                 scrollToSection(link.id);
//                 setMobileMenuOpen(false);
//               }}
//               className="text-left text-base font-medium text-slate-600 hover:text-blue-600"
//             >
//               {link.name}
//             </button>
//           ))}
//           <button className="bg-slate-900 text-white px-5 py-3 rounded-lg text-sm font-medium text-center">
//             Get Started
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// const Hero = ({ scrollToSection }) => (
//   <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
//     {/* Background Gradient Blob */}
//     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-purple-200/60 via-pink-100/60 to-blue-100/60 blur-[100px] rounded-full -z-10 opacity-70" />
    
//     <div className="max-w-7xl mx-auto px-6 text-center">
//       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in-up">
//         <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
//         v1.0 Now Available
//       </div>
      
//       <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto">
//         Documentation as Code <br />
//         <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
//           for Your Data Warehouse.
//         </span>
//       </h1>
      
//       <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
//         Define your schemas, sources, and lineage in a standardized JSON DSL. 
//         Generate beautiful static sites, interactive lineage graphs, and ERDs automatically.
//       </p>
      
//       <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//         <button 
//           onClick={() => scrollToSection('dsl')}
//           className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
//         >
//           Explore the JSON DSL <ChevronRight size={18} />
//         </button>
//         <button 
//           onClick={() => window.open('https://github.com', '_blank')}
//           className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 transition-all hover:shadow-md flex items-center justify-center gap-2"
//         >
//           <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
//           View on GitHub
//         </button>
//       </div>

//       {/* Dashboard Preview Mockup */}
//       <div className="mt-16 relative max-w-5xl mx-auto">
//         <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur opacity-20"></div>
//         <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
//             <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-2">
//                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
//                 <div className="w-3 h-3 rounded-full bg-amber-400"></div>
//                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
//                 <div className="ml-4 bg-white px-3 py-0.5 rounded text-[10px] text-slate-400 border border-slate-100 font-mono flex-1 text-center">localhost:3000/lineage-graph</div>
//             </div>
//             <div className="p-2 bg-slate-50">
//                <div className="bg-white rounded-lg border border-slate-200 p-8 min-h-[400px] flex items-center justify-center">
//                   {/* Simulated Graph UI */}
//                   <div className="flex items-center gap-12 opacity-80 scale-90 md:scale-100">
//                      <div className="w-48 p-4 rounded-lg border-2 border-blue-200 bg-blue-50 shadow-sm">
//                         <div className="font-bold text-blue-800 mb-2 text-sm">MongoDB: Orders</div>
//                         <div className="h-2 w-3/4 bg-blue-200 rounded mb-2"></div>
//                         <div className="h-2 w-1/2 bg-blue-200 rounded"></div>
//                      </div>
//                      <div className="flex-1 h-[2px] bg-slate-300 w-24 relative">
//                         <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-slate-100 px-1 text-slate-500">transform()</div>
//                         <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-300 rotate-45"></div>
//                      </div>
//                      <div className="w-48 p-4 rounded-lg border-2 border-amber-200 bg-amber-50 shadow-sm">
//                         <div className="font-bold text-amber-800 mb-2 text-sm">DW: Fact_Orders</div>
//                         <div className="h-2 w-3/4 bg-amber-200 rounded mb-2"></div>
//                         <div className="h-2 w-1/2 bg-amber-200 rounded"></div>
//                      </div>
//                   </div>
//                </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// const FeatureCard = ({ icon: Icon, title, description, delay }) => (
//   <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300">
//     <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
//       <Icon size={24} />
//     </div>
//     <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
//     <p className="text-slate-600 leading-relaxed">
//       {description}
//     </p>
//   </div>
// );

// const Features = () => (
//   <section id="features" className="py-24 bg-slate-50/50">
//     <div className="max-w-7xl mx-auto px-6">
//       <div className="text-center max-w-3xl mx-auto mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to manage data drift.</h2>
//         <p className="text-lg text-slate-600">
//           DBDocManager acts as the bridge between your raw NoSQL sources and your analytical relational targets.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8">
//         <FeatureCard 
//           icon={FileJson}
//           title="JSON DSL"
//           description="Define schema, sources, and mappings in strict, parseable JSON files. Easily generated by scripts or managed by humans."
//         />
//         <FeatureCard 
//           icon={GitBranch}
//           title="Automated Lineage"
//           description="Visualize column-level dependencies instantly. Trace data from raw MongoDB collections all the way to Snowflake marts."
//         />
//         <FeatureCard 
//           icon={CheckCircle}
//           title="Drift Detection"
//           description="CI/CD integration ensures your documentation never goes stale. Validate schemas against production DBs automatically."
//         />
//       </div>
//     </div>
//   </section>
// );

const CodeSnippet = ({ code, label }) => (
  <div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-[#0f172a] text-slate-200 font-mono text-sm my-6">
    <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
      </div>
    </div>
    <div className="p-6 overflow-x-auto">
      <pre>{code}</pre>
    </div>
  </div>
);

const DSLGuide = () => {
  const [activeTab, setActiveTab] = useState('targets');

  const tabs = [
    { id: 'targets', label: 'Targets (Tables)', icon: Database },
    { id: 'sources', label: 'Sources (Upstream)', icon: Layers },
    { id: 'mappings', label: 'Mappings (Lineage)', icon: Activity },
  ];

  const codeExamples = {
    targets: `{
  "targets": [
    {
      "db": "dw",
      "engine": "postgres",
      "schema": "mart",
      "tables": [
        {
          "name": "dim_user",
          "description": "Master user dimension",
          "columns": [
            { "name": "user_id", "type": "INT", "pk": true },
            { "name": "email", "type": "VARCHAR", "unique": true }
          ]
        }
      ]
    }
  ]
}`,
    sources: `{
  "sources": [
    {
      "id": "mongo_users",
      "kind": "mongodb",
      "conn": "atlas-cluster-A",
      "db": "shop",
      "collection": "users",
      "description": "Raw user documents from app"
    }
  ]
}`,
    mappings: `{
  "mappings": [
    {
      "target": "dw.mart.dim_user.email",
      "from": {
        "source_id": "mongo_users",
        "path": "$.contact.email",
        "transform": "lower(trim())"
      }
    },
    {
      "target": "dw.mart.dim_user.address",
      "from": {
        "source_id": "mongo_users",
        "path": "$.address.full_street"
      }
    }
  ]
}`,
  };

  return (
    <section id="dsl" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Explanation */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Mastering the JSON DSL</h2>
            <p className="text-lg text-slate-600 mb-8">
              The DBDoc DSL is designed to be human-readable and machine-parseable JSON. It consists of three core sections that describe the "What", the "Where", and the "How".
            </p>
            
            <div className="flex flex-col gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 ${
                    activeTab === tab.id 
                      ? 'border-purple-500 bg-purple-50 shadow-sm' 
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeTab === tab.id ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <tab.icon size={20} />
                  </div>
                  <div>
                    <h4 className={`font-bold ${activeTab === tab.id ? 'text-purple-900' : 'text-slate-700'}`}>{tab.label}</h4>
                    <p className="text-sm text-slate-500">
                      {tab.id === 'targets' && 'Define your destination schema structure.'}
                      {tab.id === 'sources' && 'Register upstream NoSQL or API sources.'}
                      {tab.id === 'mappings' && 'Link source fields to target columns.'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Code Window */}
          <div className="lg:w-1/2">
            <div className="sticky top-32">
              <CodeSnippet 
                code={codeExamples[activeTab]} 
                label={`project_schema_${activeTab}.json`} 
              />
              <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-sm flex gap-3 items-start">
                <div className="mt-0.5"><Code size={16} /></div>
                <p>
                  <strong>Pro Tip:</strong> You can split these definitions into multiple files. The parser automatically merges all <code>.json</code> files in your repository.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const FullExample = () => (
    <section id="examples" className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">A Complete Project Example</h2>
                <p className="text-slate-400">See how a retail analytics warehouse is defined in a single JSON view.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-purple-400">Input (JSON DSL)</h3>
                    <div className="bg-[#0B1120] border border-slate-700 rounded-xl p-6 font-mono text-xs leading-relaxed text-slate-300 shadow-2xl overflow-auto max-h-[500px]">
{`{
  "project": "retail_dw",
  "owners": ["data-eng@company.com"],
  "targets": [
    {
      "db": "dw",
      "engine": "postgres",
      "schema": "mart",
      "tables": [
        {
          "name": "dim_user",
          "description": "Master user dimension",
          "columns": [
            { "name": "user_id", "type": "INTEGER", "pk": true },
            { "name": "email", "type": "VARCHAR(320)", "unique": true },
            { "name": "created_at", "type": "TIMESTAMP" }
          ]
        }
      ]
    }
  ],
  "sources": [
    {
      "id": "mongo_users",
      "kind": "mongodb",
      "db": "shop",
      "collection": "users"
    }
  ],
  "mappings": [
    {
      "target": "dw.mart.dim_user.email",
      "from": {
        "source_id": "mongo_users",
        "path": "$.contact.email",
        "transform": "lower()"
      }
    },
    {
      "target": "dw.mart.dim_user.user_id",
      "from": {
        "rule": "sequence('user_seq')"
      }
    }
  ]
}`}
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Output (Documentation)</h3>
                    <div className="space-y-4">
                        <div className="bg-white text-slate-900 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Database size={20}/></div>
                                <div>
                                    <div className="font-bold text-lg">dim_user</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wide">Table • Postgres</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <div className="font-mono font-bold">user_id</div>
                                    <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">PK</div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="font-mono font-bold">email</div>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">VARCHAR</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Mapped</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                                Lineage: 1 source system connected
                            </div>
                        </div>

                        <div className="bg-white/10 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                             <div className="flex items-center gap-3 text-slate-300 mb-2">
                                <CheckCircle size={18} className="text-green-400" />
                                <span className="font-mono text-sm">Validation Passed</span>
                             </div>
                             <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-green-400"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);



// --- Main App Component ---

export default function Documentation() {
//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      <Navbar/>
      <main>
        {/* <Hero scrollToSection={scrollToSection} /> */}
        {/* <Features /> */}
        <DSLGuide />
        <FullExample />
      </main>
      <Footer />
    </div>
  );
}