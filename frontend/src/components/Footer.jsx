export const Footer = () => (
  <footer className="bg-white border-t border-slate-100 py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
        <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center text-white text-xs">
          DB
        </div>
        DBDocManager
      </div>
      <div className="text-slate-500 text-sm">
        © 2025 DBDocManager Project. Open Source.
      </div>
      <div className="flex gap-6">
        <a href="#" className="text-slate-500 hover:text-slate-900">GitHub</a>
        <a href="#" className="text-slate-500 hover:text-slate-900">Docs</a>
        <a href="#" className="text-slate-500 hover:text-slate-900">Twitter</a>
      </div>
    </div>
  </footer>
);