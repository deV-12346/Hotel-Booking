import React from 'react'
import Navbar from './Components/Navbar'
import {Route, Routes, useLocation} from "react-router-dom"
import Home from './Pages/Home'
import Footer from './Components/Footer'
import AllRooms from './Pages/AllRooms'
import RoomDetails from './Components/RoomDetails'
import MyBooking from './Pages/MyBooking'
import HotelReg from './Components/HotelReg'
import Layout from "./Pages/HotelOwner/Layout"
import Dashboard from './Pages/HotelOwner/Dashboard'
import AddRoom from './Pages/HotelOwner/AddRoom'
import ListRoom from './Pages/HotelOwner/ListRoom'
const App = () => {
  const isOwner = useLocation().pathname.includes("owner")
  return (
    <div>
     {!isOwner && <Navbar/>} 
    {false &&  <HotelReg /> }
    <div className='min-h-[70vh]'>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/rooms' element={<AllRooms />}/>
      <Route path='/rooms/:id' element={<RoomDetails/>} />
      <Route path='my-bookings' element={<MyBooking />} />
      <Route path='/owner' element={<Layout />} >
          <Route index element={<Dashboard/>} />
          <Route path='add-room' element={<AddRoom/>} />
          <Route path='list-room' element={<ListRoom/>} />
      </Route>
     </Routes>
    </div>
    {! isOwner && <Footer /> }
    </div>
  )
}

export default App