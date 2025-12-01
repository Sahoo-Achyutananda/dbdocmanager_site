import React, { useState } from 'react';
import { 
  Book, Terminal, Code, Layout, FileText, ChevronRight, 
  Search, Menu, X, ExternalLink, Hash, ChevronDown, Command 
} from 'lucide-react';
import { Navbar } from '../components/Navbar';

import DOCS_DATA from '../data/data';

const CodeBlock = ({ code, language, label }) => (
  <div className="my-4 rounded-xl overflow-hidden bg-gray-900 text-gray-100 border border-gray-800 shadow-md group">
    {label && (
      <div className="px-4 py-2 bg-white/5 border-b border-white/10 text-xs font-mono text-gray-400 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-gray-600 uppercase">{language}</span>
      </div>
    )}
    <div className="p-4 overflow-x-auto">
      <pre className="font-mono text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

// --- RENDERERS FOR DIFFERENT CONTENT TYPES ---

const GuideRenderer = ({ content }) => (
  <div className="space-y-6">
    {content.overview && <p className="text-lg text-gray-600 leading-relaxed">{content.overview}</p>}
    
    {content.keyFeatures && (
      <div className="grid gap-3">
        <h4 className="font-bold text-gray-900">Key Features</h4>
        <div className="grid sm:grid-cols-2 gap-3">
            {content.keyFeatures.map((feat, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feat}</span>
            </div>
            ))}
        </div>
      </div>
    )}

    {content.steps && (
      <div className="space-y-4 mt-6">
        {content.steps.map((step, i) => (
          <div key={i} className="relative pl-8 border-l-2 border-gray-100 pb-6 last:pb-0 last:border-0">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-purple-500" />
            <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
            {step.code && <CodeBlock code={step.code} language={step.language} />}
          </div>
        ))}
      </div>
    )}
  </div>
);

const TutorialRenderer = ({ content }) => (
  <div className="space-y-8">
    <p className="text-gray-600">{content.description}</p>
    <div className="space-y-12">
      {content.steps.map((step, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white font-bold text-sm">
              {step.step}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
          </div>
          <p className="text-gray-600 mb-4 ml-12">{step.description}</p>
          <div className="ml-12">
            <CodeBlock code={step.code} language={step.language} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ReferenceRenderer = ({ content }) => (
  <div className="space-y-6">
    <p className="text-gray-600">{content.description}</p>
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Field</th>
            <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Type</th>
            <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {content.fields.map((field, i) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-mono text-purple-700 font-medium">
                {field.name}
                {field.required && <span className="ml-2 text-red-500 text-xs" title="Required">*</span>}
              </td>
              <td className="px-6 py-4 font-mono text-gray-500 text-xs">{field.type}</td>
              <td className="px-6 py-4 text-gray-600">
                {field.description}
                {field.default && (
                    <div className="mt-1 text-xs text-gray-400">Default: <code className="bg-gray-100 px-1 rounded">{field.default.toString()}</code></div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {content.example && (
        <div className="mt-6">
            <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Example Payload</h4>
            <CodeBlock code={content.example} language="json" />
        </div>
    )}
  </div>
);

const CliRenderer = ({ content }) => (
  <div className="space-y-8">
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs font-mono uppercase tracking-widest">
            <Terminal size={14} />
            Usage
        </div>
        <div className="font-mono text-lg">
            <span className="text-purple-400">$</span> {content.usage}
        </div>
    </div>

    <p className="text-gray-600 text-lg">{content.description}</p>

    {content.arguments && (
        <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                Arguments
            </h3>
            <div className="grid gap-3">
                {content.arguments.map((arg, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <code className="bg-purple-50 text-purple-700 px-2 py-1 rounded font-mono text-sm font-bold">{arg.name}</code>
                        <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">{arg.type}</span>
                        <span className="text-gray-600 flex-1">{arg.description}</span>
                        {arg.required && <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-1 rounded">Required</span>}
                    </div>
                ))}
            </div>
        </div>
    )}

    {content.options && (
        <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                Options
            </h3>
            <div className="grid gap-3">
                {content.options.map((opt, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-mono text-sm font-bold min-w-[120px]">{opt.flag}</code>
                        <span className="text-gray-600 flex-1">{opt.description}</span>
                        {opt.default && <span className="text-xs text-gray-400 font-mono">default: {opt.default}</span>}
                    </div>
                ))}
            </div>
        </div>
    )}

    {content.examples && (
        <div>
             <h3 className="text-lg font-bold text-gray-900 mb-4">Examples</h3>
             <div className="space-y-4">
                {content.examples.map((ex, i) => (
                    <div key={i}>
                        <p className="text-sm text-gray-500 mb-2 font-medium">{ex.description}</p>
                        <CodeBlock code={ex.command} language="bash" />
                    </div>
                ))}
             </div>
        </div>
    )}
  </div>
);

const FaqRenderer = ({ content }) => (
    <div className="grid gap-4">
        {content.items.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-3">
                    <span className="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">Q</span>
                    {item.q}
                </h4>
                <p className="text-gray-600 ml-9">{item.a}</p>
            </div>
        ))}
    </div>
);

const ExampleRenderer = ({ content }) => (
    <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">{content.description}</p>
        
        <div className="grid lg:grid-cols-2 gap-6">
            {content.mongoDocument && (
                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Source Document</h4>
                    <CodeBlock code={content.mongoDocument} language="json" />
                </div>
            )}
            <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">DSL Mapping</h4>
                <CodeBlock code={content.code} language="json" />
            </div>
        </div>

        {content.notes && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <h4 className="text-blue-800 font-bold mb-2 flex items-center gap-2">
                    <span className="text-xl">💡</span> Key Concepts
                </h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700/80 text-sm">
                    {content.notes.map((note, i) => <li key={i}>{note}</li>)}
                </ul>
            </div>
        )}
    </div>
);


export default function Documentation() {
  const [activeSectionId, setActiveSectionId] = useState('introduction');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to find current section data
  const getCurrentSection = () => {
    for (const section of DOCS_DATA.sections) {
      const found = section.subsections.find(sub => sub.id === activeSectionId);
      if (found) return { ...found, parent: section.title };
    }
    return null;
  };

  const activeData = getCurrentSection();

  // Render content based on type
  const renderContent = () => {
    if (!activeData) return <div>Not Found</div>;

    switch (activeData.type) {
      case 'guide': return <GuideRenderer content={activeData.content} />;
      case 'reference': return <ReferenceRenderer content={activeData.content} />;
      case 'cli': return <CliRenderer content={activeData.content} />;
      case 'tutorial': return <TutorialRenderer content={activeData.content} />;
      case 'example': return <ExampleRenderer content={activeData.content} />;
      case 'faq': return <FaqRenderer content={activeData.content} />;
      default: return <div className="text-gray-500">Unknown content type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      
      <Navbar/>

      
      {/* Sidebar Overlay for Mobile */}
      {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 shadow-2xl overflow-y-auto">
                  <div className="flex justify-between items-center mb-8">
                      <span className="font-bold text-lg">Menu</span>
                      <button onClick={() => setMobileMenuOpen(false)}><X size={24} className="text-gray-500" /></button>
                  </div>
                  <SidebarContent sections={DOCS_DATA.sections} activeId={activeSectionId} onSelect={(id) => { setActiveSectionId(id); setMobileMenuOpen(false); }} />
              </div>
          </div>
      )}

      <div className="pt-16 flex max-w-8xl mx-auto mt-10">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 fixed top-16 bottom-0 left-0 overflow-y-auto border-r border-gray-100 bg-white/50 backdrop-blur-sm p-6 mt-10">
            <SidebarContent sections={DOCS_DATA.sections} activeId={activeSectionId} onSelect={setActiveSectionId} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 min-h-[calc(100vh-4rem)]">
            <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
                    <span>Docs</span>
                    <ChevronRight size={14} />
                    <span className="text-gray-800">{activeData?.parent}</span>
                </div>

                {/* Page Header */}
                <div className="mb-10 border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${
                            activeData.type === 'cli' ? 'bg-gray-900 text-white' : 
                            activeData.type === 'reference' ? 'bg-purple-100 text-purple-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                            {activeData.type === 'cli' ? <Terminal size={24} /> : 
                             activeData.type === 'reference' ? <Layout size={24} /> :
                             <FileText size={24} />}
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{activeData.title}</h1>
                    </div>
                    {/* Type Badge */}
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                         activeData.type === 'cli' ? 'bg-gray-100 text-gray-600' : 
                         activeData.type === 'reference' ? 'bg-purple-50 text-purple-600' :
                         'bg-blue-50 text-blue-600'
                    }`}>
                        <Hash size={12} />
                        {activeData.type}
                    </span>
                </div>

                {/* Dynamic Content Render */}
                <div className="prose prose-gray max-w-none">
                    {renderContent()}
                </div>

                {/* Navigation Footer */}
                <div className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        Last updated: {DOCS_DATA.meta.lastUpdated}
                    </div>
                    <div className="flex gap-4">
                        <button className="text-gray-400 hover:text-gray-900 transition-colors font-medium text-sm">Edit this page</button>
                    </div>
                </div>
            </div>
        </main>
      </div>

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
      `}</style>
    </div>
  );
}

function SidebarContent({ sections, activeId, onSelect }) {
    return (
        <div className="space-y-8">
            {sections.map((section) => (
                <div key={section.id}>
                    <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider px-2">
                        {/* Simplified icon logic for demo */}
                        {section.id === 'getting-started' && '🚀'}
                        {section.id === 'dsl-reference' && '📝'}
                        {section.id === 'cli-commands' && '⌨️'}
                        {section.id === 'examples' && '📚'}
                        {section.id === 'faq' && '❓'}
                        <span className="ml-1">{section.title}</span>
                    </h5>
                    <ul className="space-y-0.5">
                        {section.subsections.map(sub => (
                            <li key={sub.id}>
                                <button
                                    onClick={() => onSelect(sub.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        activeId === sub.id 
                                        ? 'bg-purple-50 text-purple-700 shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    {sub.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}