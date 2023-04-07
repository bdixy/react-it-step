import { Routes, Route } from 'react-router-dom'
import Login from './components/page/Login'
import Register from './components/page/Register'
import Recovery from './components/page/Recovery'

function App() {

  return (
    <>
      <Routes>
        <Route path="/"/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="recovery" element={<Recovery/>}/>
      </Routes>
    </>
  )
}

export default App
