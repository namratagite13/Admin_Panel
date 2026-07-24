
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import {Routes, Route} from 'react-router-dom'
import AdminPage from './pages/AdminPage'

import Lectures from './pages/Lectures'
import Instructor from './pages/Instructor'



function App() {
  

  return (
    <>
    <Routes>
      <Route  path="/" element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="/admin" element={<AdminPage />}/>
      <Route path="/lecture" element={<Lectures />}/>
      <Route path="/instructor" element={<Instructor />}/>

    </Routes>

      
    </>
  )
}

export default App
