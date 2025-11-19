export function Navbar() {
  return (
    <nav className="w-full bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">DBDocManager</h1>

      <div className="space-x-6 font-medium">
        <a href="/" className="hover:text-green-200">Home</a>
        <a href="/docs" className="hover:text-green-200">Documentation</a>
        <a href="/download" className="hover:text-green-200">Download</a>
        <a href="/editor" className="hover:text-green-200">Live Editor</a>
      </div>
    </nav>
  );
}
