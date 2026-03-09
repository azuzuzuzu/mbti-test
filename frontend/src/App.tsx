import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import DebateSelect from './pages/DebateSelect'
import Debate from './pages/Debate'
import Result from './pages/Result'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/debate-select" element={<DebateSelect />} />
        <Route path="/debate/:topicId" element={<Debate />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
