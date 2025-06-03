import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Titlte from './Titlte'
import { useNavigate } from 'react-router-dom'

const FeaturedDestination = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center px-6 md:px-10 lg:px-15 py-20 bg-slate-50'>
      <Titlte title="Featured Destination " subtitle="Discover out handpicked  selection of exceptional 
      properties around the world , offering unparalleled luxury and  unforgettable exprience" />
      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {
            roomsDummyData.slice(0,4).map((room,index)=>(
                  <HotelCard key={room._id} room={room}  index={index}/>
            ))
            }
      </div>
      <button   onClick={()=>navigate("/rooms")}
       className='my-16 px-4 py-2 text-sm font-medium border border-gray-300
      rounded bg-white hover:bg-gray-50 cursor-pointer transition-all'>View All Destination</button>
    </div>
  )
}

export default FeaturedDestination