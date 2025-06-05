import React from 'react'
import Navbar from './Components/Navbar'
import {Route, Routes, useLocation} from "react-router-dom"
import Home from './Pages/Home'
import Footer from './Components/Footer'
import AllRooms from './Pages/AllRooms'
import RoomDetails from './Components/RoomDetails'
import MyBooking from './Pages/MyBooking'
const App = () => {
  const isOwner = useLocation().pathname.includes("owner")
  return (
    <div>
     {!isOwner && <Navbar/>} 
    <div className='min-h[70vh]'>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/rooms' element={<AllRooms />}/>
      <Route path='/rooms/:id' element={<RoomDetails/>} />
      <Route path='my-bookings' element={<MyBooking />} />
     </Routes>
    </div>
    <Footer />
    </div>
  )
}

export default App