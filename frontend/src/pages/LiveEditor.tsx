import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Database, GitBranch, FileCode, Download, ArrowRight, Layout } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import Editor from '@monaco-editor/react';

const SAMPLE_DSL = `{
  "project": "ecommerce_dw",
  "version": "1.0.0",
  "description": "E-commerce data warehouse",
  "owners": ["data-eng@company.com"],
  "targets": [
    {
      "db": "warehouse",
      "engine": "postgres",
      "schema": "public",
      "tables": [
        {
          "name": "dim_users",
          "description": "User dimension",
          "columns": [
            {
              "name": "user_id",
              "type": "INTEGER",
              "pk": true,
              "description": "Surrogate key"
            },
            {
              "name": "email",
              "type": "VARCHAR(255)",
              "unique": true,
              "nullable": false,
              "description": "User email"
            },
            {
              "name": "full_name",
              "type": "VARCHAR(200)"
            }
          ]
        },
        {
          "name": "fact_orders",
          "description": "Order facts",
          "columns": [
            {
              "name": "order_id",
              "type": "INTEGER",
              "pk": true
            },
            {
              "name": "user_id",
              "type": "INTEGER",
              "nullable": false
            },
            {
              "name": "amount",
              "type": "DECIMAL(10,2)"
            }
          ],
          "foreign_keys": [
            {
              "name": "fk_user",
              "columns": ["user_id"],
              "references": {
                "table": "dim_users",
                "columns": ["user_id"]
              }
            }
          ]
        }
      ]
    }
  ],
  "sources": [
    {
      "id": "mongo_users",
      "kind": "mongodb",
      "db": "production",
      "collection": "users",
      "description": "User collection"
    }
  ],
  "mappings": [
    {
      "target": "warehouse.public.dim_users.email",
      "from": {
        "source_id": "mongo_users",
        "path": "$.contact.email",
        "transform": "LOWER()"
      }
    },
    {
      "target": "warehouse.public.dim_users.full_name",
      "from": {
        "source_id": "mongo_users",
        "path": "$.name",
        "transform": "CONCAT($.first, ' ', $.last)"
      }
    }
  ]
}`;

// function LiveEditor() {
//   const [dslText, setDslText] = useState(SAMPLE_DSL);
//   const [errors, setErrors] = useState([]);
//   const [parsedData, setParsedData] = useState(null);
//   const [activeTab, setActiveTab] = useState('schema');

//   useEffect(() => {
//     const result = lintDBDoc(dslText);
//     setErrors(result.errors);
//     setParsedData(result.data);
//   }, [dslText]);

//   const errorCount = errors.filter(e => e.severity === 'error').length;
//   const warningCount = errors.filter(e => e.severity === 'warning').length;

//   const handleDownload = () => {
//     const blob = new Blob([dslText], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'schema.json';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden">
//       <Navbar />
//       {/* Background Blobs (Theme Match) */}
//       {/* <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] -z-10 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-[96px] opacity-50 animate-blob"></div>
//         <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-[96px] opacity-50 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[96px] opacity-50 animate-blob animation-delay-4000"></div>
//       </div> */}

//       <div className="container mx-auto p-6 max-w-7xl pt-12 mt-20 ">
//         {/* Header Section */}
//         <div className="mb-8">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
//                         DBDoc Live Editor
//                     </h1>
//                     <p className="text-gray-500 text-lg">
//                         Define your schema, validate relationships, and export documentation.
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     {/* Status Indicators */}
//                     <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
//                         {errorCount === 0 && warningCount === 0 ? (
//                             <div className="flex items-center gap-2 text-green-600">
//                                 <CheckCircle size={18} className="fill-green-100" />
//                                 <span className="font-medium text-sm">Valid DSL</span>
//                             </div>
//                         ) : (
//                             <div className="flex items-center gap-3">
//                                 {errorCount > 0 && (
//                                     <div className="flex items-center gap-1.5 text-red-600">
//                                         <AlertCircle size={18} />
//                                         <span className="font-medium text-sm">{errorCount} Errors</span>
//                                     </div>
//                                 )}
//                                 {warningCount > 0 && (
//                                     <div className="flex items-center gap-1.5 text-amber-600">
//                                         <AlertCircle size={18} />
//                                         <span className="font-medium text-sm">{warningCount} Warnings</span>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                         {parsedData && (
//                             <>
//                                 <div className="h-4 w-px bg-gray-200 mx-1"></div>
//                                 <span className="text-gray-500 text-sm">
//                                     <span className="font-semibold text-gray-900">{parsedData.targets.reduce((sum, t) => sum + t.tables.length, 0)}</span> Tables
//                                 </span>
//                             </>
//                         )}
//                     </div>

//                     <button
//                         onClick={handleDownload}
//                         className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
//                     >
//                         <Download size={16} />
//                         Export JSON
//                     </button>
//                 </div>
//             </div>
//         </div>

//         {/* Main Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
//           {/* Editor Panel */}
//           <div className="flex flex-col h-[700px] bg-white rounded-2xl shadow-xl shadow-purple-900/5 border border-gray-100 overflow-hidden">
//             <div className="bg-gray-50/80 backdrop-blur border-b border-gray-100 px-6 py-4 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="p-1.5 bg-blue-100 rounded-lg">
//                     <FileCode size={18} className="text-blue-600" />
//                 </div>
//                 <span className="font-semibold text-gray-900">DSL Definition</span>
//               </div>
//               <div className="text-xs font-mono text-gray-400">JSON Format</div>
//             </div>
            
//             <div className="flex-1 relative bg-gray-900">
//                 {/* Simulated VS Code gutter */}
//                 <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800/50 border-r border-gray-700/50 z-10 flex flex-col items-center pt-4 gap-1 text-gray-600 font-mono text-xs select-none">
//                     <div>1</div><div>2</div><div>3</div><div>...</div>
//                 </div>
//                 <textarea
//                 value={dslText}
//                 onChange={(e) => setDslText(e.target.value)}
//                 className="w-full h-full p-4 pl-16 font-mono text-sm bg-gray-900 text-gray-200 resize-none focus:outline-none leading-relaxed selection:bg-purple-500/30"
//                 spellCheck={false}
//                 />
//             </div>
//           </div>

//           {/* Preview Panel */}
//           <div className="flex flex-col h-[700px] bg-white rounded-2xl shadow-xl shadow-purple-900/5 border border-gray-100 overflow-hidden">
//             {/* Tabs */}
//             <div className="flex items-center border-b border-gray-100 px-2 bg-white">
//               <button
//                 onClick={() => setActiveTab('errors')}
//                 className={`px-6 py-4 flex items-center gap-2 text-sm font-medium transition-all border-b-2 ${
//                   activeTab === 'errors'
//                     ? 'border-purple-600 text-purple-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
//                 }`}
//               >
//                 <AlertCircle size={16} />
//                 Validation
//                 {errorCount > 0 && (
//                   <span className="ml-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-bold">
//                     {errorCount}
//                   </span>
//                 )}
//               </button>
//               <button
//                 onClick={() => setActiveTab('schema')}
//                 className={`px-6 py-4 flex items-center gap-2 text-sm font-medium transition-all border-b-2 ${
//                   activeTab === 'schema'
//                     ? 'border-purple-600 text-purple-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
//                 }`}
//               >
//                 <Database size={16} />
//                 Schema View
//               </button>
//               <button
//                 onClick={() => setActiveTab('lineage')}
//                 className={`px-6 py-4 flex items-center gap-2 text-sm font-medium transition-all border-b-2 ${
//                   activeTab === 'lineage'
//                     ? 'border-purple-600 text-purple-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
//                 }`}
//               >
//                 <GitBranch size={16} />
//                 Data Lineage
//               </button>
//             </div>

//             {/* Tab Content */}
//             <div className="flex-1 overflow-auto p-6 bg-gray-50/50">
//               {activeTab === 'errors' && <ValidationTab errors={errors} />}
//               {activeTab === 'schema' && <SchemaTab data={parsedData} />}
//               {activeTab === 'lineage' && <LineageTab data={parsedData} />}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Global Styles for Animations */}
//       <style jsx global>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }

function LiveEditor() {
  const [dslText, setDslText] = useState(SAMPLE_DSL);
  const [errors, setErrors] = useState([]);
  const [parsedData, setParsedData] = useState(null);
  const [activeTab, setActiveTab] = useState('schema');

  useEffect(() => {
    const result = lintDBDoc(dslText);
    setErrors(result.errors);
    setParsedData(result.data);
  }, [dslText]);

  const errorCount = errors.filter(e => e.severity === 'error').length;
  const warningCount = errors.filter(e => e.severity === 'warning').length;

  const handleDownload = () => {
    const blob = new Blob([dslText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle Monaco Change
  const handleEditorChange = (value) => {
    setDslText(value);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden">
      <Navbar />

      <div className="container mx-auto p-6 max-w-7xl pt-12 mt-17">
        <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
                        DBDoc Live Editor
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Define your schema, validate relationships, and export documentation.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                        {errorCount === 0 && warningCount === 0 ? (
                            <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle size={18} className="fill-green-100" />
                                <span className="font-medium text-sm">Valid DSL</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                {errorCount > 0 && (
                                    <div className="flex items-center gap-1.5 text-red-600">
                                        <AlertCircle size={18} />
                                        <span className="font-medium text-sm">{errorCount} Errors</span>
                                    </div>
                                )}
                                {warningCount > 0 && (
                                    <div className="flex items-center gap-1.5 text-amber-600">
                                        <AlertCircle size={18} />
                                        <span className="font-medium text-sm">{warningCount} Warnings</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {parsedData && (
                            <>
                                <div className="h-4 w-px bg-gray-200 mx-1"></div>
                                <span className="text-gray-500 text-sm">
                                    <span className="font-semibold text-gray-900">{parsedData.targets.reduce((sum, t) => sum + t.tables.length, 0)}</span> Tables
                                </span>
                            </>
                        )}
                    </div>

                    <button
                        onClick={handleDownload}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                        <Download size={16} />
                        Export JSON
                    </button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="flex flex-col h-[700px] bg-white rounded-2xl shadow-xl shadow-purple-900/5 border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/80 backdrop-blur border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                    <FileCode size={18} className="text-blue-600" />
                </div>
                <span className="font-semibold text-gray-900">DSL Definition</span>
              </div>
              <div className="text-xs font-mono text-gray-400">JSON Format</div>
            </div>
            
            <div className="flex-1 relative bg-[#1e1e1e]"> 
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={dslText}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false }, // Cleaner look
                        fontSize: 14,
                        padding: { top: 20, bottom: 20 },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        fontFamily: "'Fira Code', 'Droid Sans Mono', 'monospace'",
                        renderLineHighlight: "none",
                    }}
                />
            </div>
          </div>

          <div className="flex flex-col h-[700px] bg-white rounded-2xl shadow-xl shadow-purple-900/5 border border-gray-100 overflow-hidden">
            <div className="flex items-center border-b border-gray-100 px-2 bg-white">
              <button
                onClick={() => setActiveTab('errors')}
                className={`px-6 py-4 flex items-center gap-2 text-sm font-medium transition-all border-b-2 ${
                  activeTab === 'errors'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <AlertCircle size={16} />
                Validation
                {errorCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-bold">
                    {errorCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('schema')}
                className={`px-6 py-4 flex items-center gap-2 text-sm font-medium transition-all border-b-2 ${
                  activeTab === 'schema'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Database size={16} />
                Schema View
              </button>
              <button
                onClick={() => setActiveTab('lineage')}
                className={`px-6 py-4 flex items-center gap-2 text-sm font-medium transition-all border-b-2 ${
                  activeTab === 'lineage'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <GitBranch size={16} />
                Data Lineage
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6 bg-gray-50/50">
              {activeTab === 'errors' && <ValidationTab errors={errors} />}
              {activeTab === 'schema' && <SchemaTab data={parsedData} />}
              {activeTab === 'lineage' && <LineageTab data={parsedData} />}
            </div>
          </div>
        </div>
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

function ValidationTab({ errors }) {
  if (errors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Everything Looks Good</h3>
        <p className="text-gray-500 max-w-xs">Your DSL syntax is valid and no logical errors were found in your schema definitions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errors.map((error, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-xl border ${
            error.severity === 'error'
              ? 'bg-red-50 border-red-100'
              : error.severity === 'warning'
              ? 'bg-amber-50 border-amber-100'
              : 'bg-blue-50 border-blue-100'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`mt-0.5 p-2 rounded-lg ${
                error.severity === 'error' ? 'bg-white text-red-500 shadow-sm' : 
                error.severity === 'warning' ? 'bg-white text-amber-500 shadow-sm' : 
                'bg-white text-blue-500 shadow-sm'
            }`}>
                 <AlertCircle size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                    error.severity === 'error' ? 'text-red-700' : 
                    error.severity === 'warning' ? 'text-amber-700' : 
                    'text-blue-700'
                }`}>
                  {error.severity}
                </span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-xs font-mono text-gray-500">{error.type}</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{error.message}</p>
              {error.location && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-white/60 rounded text-xs font-mono text-gray-600 border border-gray-200/50">
                   <span>at</span>
                   <span className="font-semibold">{error.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SchemaTab({ data }) {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <Layout size={48} className="mb-4 text-gray-300" />
        <p>Fix syntax errors to preview the schema.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Project Info Card */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.project}</h3>
        <p className="text-gray-500 mb-4">{data.description}</p>
        {data.owners && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">DE</div>
            </div>
            <span className="text-sm text-gray-600 font-medium">{data.owners.join(', ')}</span>
          </div>
        )}
      </div>

      {data.targets.map((target, idx) => (
        <div key={idx} className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Database size={20} className="text-purple-600" />
            <h4 className="text-lg font-bold text-gray-900">
                {target.db} 
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium uppercase tracking-wide">{target.engine}</span>
            </h4>
          </div>
          
          <div className="grid gap-4">
            {target.tables.map((table, tidx) => (
              <div key={tidx} className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-purple-100">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h5 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                            {table.name}
                        </h5>
                        {table.description && (
                            <p className="text-sm text-gray-500 mt-1">{table.description}</p>
                        )}
                    </div>
                    <div className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                        {table.columns.length} columns
                    </div>
                </div>
                
                <div className="w-full overflow-hidden rounded-lg border border-gray-100">
                  <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-500 font-medium">
                          <tr>
                              <th className="px-4 py-2 font-medium">Column</th>
                              <th className="px-4 py-2 font-medium">Type</th>
                              <th className="px-4 py-2 font-medium text-right">Attributes</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {table.columns.map((col, cidx) => (
                            <tr key={cidx} className="hover:bg-gray-50/50">
                                <td className="px-4 py-2 font-mono text-gray-700 font-medium">{col.name}</td>
                                <td className="px-4 py-2 text-gray-500 font-mono text-xs">{col.type}</td>
                                <td className="px-4 py-2 text-right space-x-1">
                                    {col.pk && <span className="inline-block px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded uppercase tracking-wider">PK</span>}
                                    {col.unique && <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">UK</span>}
                                    {!col.nullable && !col.pk && <span className="inline-block px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">NN</span>}
                                </td>
                            </tr>
                        ))}
                      </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function LineageTab({ data }) {
  if (!data || data.mappings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <GitBranch size={48} className="mb-4 text-gray-300" />
        <p>No mappings defined yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.mappings.map((mapping, idx) => (
        <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-purple-200 transition-colors">
          {/* Decorative connector line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 text-gray-300 group-hover:text-purple-300 transition-colors">
            <ArrowRight size={24} />
          </div>

          <div className="flex flex-col md:flex-row gap-8 z-10">
            {/* Source Side */}
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Source</span>
               </div>
               <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/50">
                 <div className="font-mono text-sm text-blue-900 font-medium truncate" title={`${mapping.from.source_id}:${mapping.from.path}`}>
                    {mapping.from.source_id}
                 </div>
                 <div className="font-mono text-xs text-blue-600 mt-1 truncate">
                    {mapping.from.path}
                 </div>
                 {mapping.from.transform && (
                    <div className="mt-2 pt-2 border-t border-blue-100 flex items-start gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-blue-400 mt-0.5">FN</span>
                        <code className="text-xs text-blue-700 bg-white px-1 py-0.5 rounded border border-blue-100">
                            {mapping.from.transform}
                        </code>
                    </div>
                  )}
               </div>
            </div>

            {/* Target Side */}
            <div className="flex-1 min-w-0 text-right md:text-left">
               <div className="flex items-center gap-2 mb-2 md:justify-end">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target</span>
                 <div className="w-2 h-2 rounded-full bg-purple-400"></div>
               </div>
               <div className="bg-purple-50/50 rounded-lg p-3 border border-purple-100/50">
                 <div className="font-mono text-sm text-purple-900 font-medium truncate" title={mapping.target}>
                    {mapping.target.split('.').slice(0, -1).join('.')}
                 </div>
                 <div className="font-mono text-xs text-purple-600 mt-1 font-bold">
                    .{mapping.target.split('.').pop()}
                 </div>
               </div>
            </div>
          </div>
          
          {mapping.description && (
             <div className="pt-3 border-t border-gray-50 text-xs text-gray-500 italic">
                "{mapping.description}"
             </div>
          )}
        </div>
      ))}
    </div>
  );
}

function lintDBDoc(jsonText) {
  const errors = [];
  let data = null;

  try {
    data = JSON.parse(jsonText);
  } catch (e) {
    errors.push({
      message: `JSON Parse Error: ${e.message}`,
      severity: 'error',
      type: 'SYNTAX_ERROR'
    });
    return { errors, data: null };
  }

  // Validate project
  if (!data.project) {
    errors.push({
      message: 'Missing required field: "project"',
      severity: 'error',
      type: 'MISSING_FIELD'
    });
  }

  if (!data.targets || data.targets.length === 0) {
    errors.push({
      message: 'No target databases defined',
      severity: 'error',
      type: 'MISSING_TARGETS'
    });
    return { errors, data };
  }

  // Validate targets
  const targetIndex = new Set();
  for (const target of data.targets) {
    if (!target.db || !target.engine) {
      errors.push({
        message: 'Target missing db or engine',
        severity: 'error',
        type: 'INVALID_TARGET'
      });
      continue;
    }

    if (!target.tables || target.tables.length === 0) {
      errors.push({
        message: `Target "${target.db}" has no tables`,
        severity: 'warning',
        type: 'EMPTY_TARGET',
        location: target.db
      });
    }

    for (const table of target.tables || []) {
      if (!table.name) {
        errors.push({
          message: 'Table missing name',
          severity: 'error',
          type: 'INVALID_TABLE'
        });
        continue;
      }

      if (!table.description) {
        errors.push({
          message: `Table "${table.name}" missing description`,
          severity: 'info',
          type: 'MISSING_DESCRIPTION',
          location: `${target.db}.${table.name}`
        });
      }

      if (!table.columns || table.columns.length === 0) {
        errors.push({
          message: `Table "${table.name}" has no columns`,
          severity: 'error',
          type: 'EMPTY_TABLE',
          location: `${target.db}.${table.name}`
        });
        continue;
      }

      const colNames = new Set();
      for (const col of table.columns) {
        if (!col.name || !col.type) {
          errors.push({
            message: `Column in "${table.name}" missing name or type`,
            severity: 'error',
            type: 'INVALID_COLUMN'
          });
          continue;
        }

        if (colNames.has(col.name)) {
          errors.push({
            message: `Duplicate column "${col.name}" in table "${table.name}"`,
            severity: 'error',
            type: 'DUPLICATE_COLUMN',
            location: `${target.db}.${table.name}.${col.name}`
          });
        }
        colNames.add(col.name);

        const fqn = `${target.db}.${target.schema || 'public'}.${table.name}.${col.name}`;
        targetIndex.add(fqn);
      }
    }
  }

  // Validate sources
  const sourceIds = new Set();
  for (const source of data.sources || []) {
    if (!source.id || !source.kind) {
      errors.push({
        message: 'Source missing id or kind',
        severity: 'error',
        type: 'INVALID_SOURCE'
      });
      continue;
    }
    sourceIds.add(source.id);
  }

  // Validate mappings
  for (const mapping of data.mappings || []) {
    if (!mapping.target) {
      errors.push({
        message: 'Mapping missing target',
        severity: 'error',
        type: 'INVALID_MAPPING'
      });
      continue;
    }

    if (!targetIndex.has(mapping.target)) {
      errors.push({
        message: `Mapping target not found: ${mapping.target}`,
        severity: 'error',
        type: 'INVALID_MAPPING_TARGET',
        location: mapping.target
      });
    }

    if (!mapping.from?.source_id || !sourceIds.has(mapping.from.source_id)) {
      errors.push({
        message: `Mapping source not found: ${mapping.from?.source_id}`,
        severity: 'error',
        type: 'INVALID_MAPPING_SOURCE',
        location: mapping.target
      });
    }

    if (!mapping.from?.path) {
      errors.push({
        message: `Mapping missing source path: ${mapping.target}`,
        severity: 'error',
        type: 'MISSING_PATH',
        location: mapping.target
      });
    }
  }

  return { errors, data };
}

export default LiveEditor;