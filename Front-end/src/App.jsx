import React from 'react'
import Navbar from './Components/Navbar'
import {Route, Routes, useLocation} from "react-router-dom"
import Home from './Pages/Home'
const App = () => {
  const isOwner = useLocation().pathname.includes("owner")
  return (
    <div>
     {!isOwner && <Navbar/>} 
    <div className='min-h[70vh]'>
     <Routes>
      <Route path='/' element={<Home/>} />
     </Routes>
    </div>
    </div>
  )
}

export default App