import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { UseAppContext } from '../Context/AppContext'

const HotelCard = ({room ,index}) => {
      const {currency} = UseAppContext()
  return (
    <Link onClick={()=>scrollTo(0,0)} to={"/rooms/" + room._id} 
     className='relative max-w-65 w-full rounded-xl overflow-hidden bg-white text-gray-500/90
      shadow-[opx_4px_4px_rgba(0,0,0,0,0.5)] 'key={index}>
      <img src={room.images[0]} alt="roomimg"
     />
      {index % 2 === 0 
         && (<p className='px-3 py-1 absolute top-3 left-3 text-xs 
         bg-white text-gray-800 font-medium rounded-full'>Best Seller</p>) }
      <div className='p-4 pt-5'>
            <div className='flex items-center justify-between'>
                  <p className='font-platfair text-xl font-medium text-gray-800'>{room.hotel.name}</p>
                  <div className='flex items-center gap-1'>
                        <img src={assets.starIconFilled} alt="staricon" />4.5
                  </div>
            </div>
            <div className='flex items-center gap-1 text-sm'>
                  <img src={assets.locationIcon} alt="locationicon" />
                  <span>{room.hotel.address}</span>
            </div>
            <div className='flex items-center justify-between'>
                  <p className='text-xl text-gray-800'><span>{currency} {room.pricePerNight}</span>/night</p>
                  <button className='px-4 py-1.5 text-sm font-medium border border-gray-300
                  rounded hover:bg-gray-50 transition-all cursor-pointer'>Book Now</button>
            </div>
      </div>
    </Link>
  )
}

export default HotelCard