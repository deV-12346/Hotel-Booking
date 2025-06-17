import React, { useEffect } from 'react'
import Navbar from '../../Components/HotelOwner/Navbar'
import Sidebar from '../../Components/HotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { UseAppContext } from '../../Context/AppContext'

const Layout = () => {
  // const {isOwner ,role, navigate} = UseAppContext()
  // useEffect(()=>{
  //   if(role !== "hotelOwner"){
  //     navigate("/")
  //   }
  // },[isOwner])
  return (
    <div className='flex flex-col h-screen'>
    <Navbar />
    <div className='flex h-full '>
      <Sidebar/>
      <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
      <Outlet />
      </div>
    </div>
   </div>
  )
}

export default Layout