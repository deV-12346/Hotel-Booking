import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Titlte from './Titlte'
import { UseAppContext } from '../Context/AppContext'

const  Recommeneded = () => {
  const {rooms,searchRecentCities} = UseAppContext()
  const [Recommened ,setrecommed] = useState([])
  const filterhotels = ()=>{
      const filterhotel = rooms.slice().filter(
      (room) => Array.isArray(searchRecentCities) && searchRecentCities.includes(room.hotel.city)
      )
      setrecommed(filterhotel)
  }
  useEffect(()=>{
     filterhotels()
  },[rooms,searchRecentCities])
  return Recommened.length > 0 &&  (
    <div className='flex flex-col items-center px-6 md:px-10 lg:px-15 py-20 bg-slate-50'>
      <Titlte title="Recommened Destination " subtitle="Discover out handpicked  selection of exceptional 
      properties around the world , offering unparalleled luxury and  unforgettable exprience" />
      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {
            Recommened.slice(0,4).map((room,index)=>(
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

export default Recommeneded