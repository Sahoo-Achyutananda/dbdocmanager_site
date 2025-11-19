import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Documentation from './pages/Documentation'
import Download from './pages/Download'
import LiveEditor from './pages/LiveEditor'

function App(){

  return(
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Documentation/>}/>
        <Route path="/download" element={<Download/>}/>
        <Route path="/editor" element={<LiveEditor/>}/>
      </Routes>
    </>
  )
}

export default App
