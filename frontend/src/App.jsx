import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Download from './pages/Download'
import LiveEditor from './pages/LiveEditor.jsx'
import Dsl from './pages/Dsl'
import Documentation from './pages/Documentation'

function App(){

  return(
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dsl" element={<Dsl/>}/>
        <Route path="/docs" element={<Documentation/>}/>
        <Route path="/download" element={<Download/>}/>
        <Route path="/editor" element={<LiveEditor/>}/>
      </Routes>
    </>
  )
}

export default App
