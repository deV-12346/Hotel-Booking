import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../Components/StarRating'

const Checkbox  = ({label , selected=false , onChange=()=>{ }})=>{
 return (
  <label className='flex gap-3 items-center  cursor-pointer mt-2 text-sm '>
      <input type="checkbox" checked={selected} onChange={(e)=>onChange(e.target.checked,label)} />
      <span className='font-light select-none'>{label}</span>
  </label>
 )
}
const RadioButton  = ({label , selected=false , onChange=()=>{ }})=>{
 return (
  <label className='flex gap-3 items-center  cursor-pointer mt-2 text-sm '>
      <input type="radio" name='SortOption' checked={selected} onChange={()=>onChange(label)} />
      <span className='font-light select-none'>{label}</span>
  </label>
 )
}

const AllRooms = () => {
      const navigate = useNavigate()
      const [openfilters,setopenfilter] = useState(false)
      const roomTypes = [
        "Single Bed",
        "Double Bed",
        "Luxury Bed",
        "Family Suite"
      ]
      const priceRanges = [
        "0 to 500",
        "500 to 1000",
        "1000 to 2000",
        "2000 to 3000"
      ]
      const sortOption = [
        "Price Low to High",
        "Price High to Low",
        "Newest First"
      ]
  return (
   <div className='flex flex-col-reverse md:flex-row justify-between items-start gap-4 pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
    <div>
      <div>
         <div className='flex flex-col items-start text-left'>
            <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
            <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
            Take advantage of our limited-time offers and special package to
            enhance your stay and create unforgettale memories.</p>
         </div>
      </div>
       {roomsDummyData.map((room)=>(
           <div key={room._id} className='flex flex-col md:flex-row items-start py-5 gap-6 
           border-b border-gray-300 last:pb-30 last:border-0'>
            <img src={room.images[0]} alt={`${room.hotel.name}`}
             onClick={()=>{navigate(`/rooms/${room._id}`),scrollTo(0,0)}}
             className='max-h-65  md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'/>
           <div className='md:w-1/2 flex flex-col  gap-2'>
            <p className='text-gray-500' >{room.hotel.city}</p>
            <p onClick={()=>{navigate(`/rooms/${room._id}`),scrollTo(0,0)}} 
            className='text-gray-800 cursor-pointer font-playfair text-3xl'>{room.hotel.name}</p>
            <div className='flex items-center justify-start'>
                  <StarRating />
                  <p className='ml-2'>200+ reviews</p>
            </div>
            <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                  <img src={assets.locationIcon} className='location-icon' />
                  <span>{room.hotel.name}</span>
            </div>
            <div className='flex   items-center mt-4 mb-6 gap-4'>
            {room.amenities.map((item,index)=>(
                <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f5f5ff]/70'>
                  <img src={facilityIcons[item]} alt={item}  className='w-5 h-5'/>
                  <p className='text-xs'>{item}</p>
                </div>
            ))}
            </div>
            <p className='text-xl font-medium text-gray-800'>${room.pricePerNight}/Night</p>
            </div> 
           </div>
       ))}
       </div>
       <div className='w-80 bg-white border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
          <div className={`flex items-center justify-between px-5 py-2.5 
            min-lg:border-b  border-gray-300  ${openfilters && "border-b"}`}>
            <p className='text-base font-medium text-gray-800'>FILTERS</p>
            <div className='text-xs cursor-pointer'>
              <span className='lg:hidden' onClick={()=>setopenfilter(!openfilters)}>
                {openfilters ? "HIDE" : "SHOW"}
                </span>
              <span className='hidden lg:block'>Clear</span>
            </div>
          </div>
          <div className={`${openfilters? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
                <div className='px-5 pt-5'>
                    <p className='font-medium text-gray-800 pb-2'>Popular filters</p>
                {roomTypes.map((room,index)=>(
                   <Checkbox key={index} label={room}/>
                ))}
                </div>
                 <div className='px-5 pt-5'>
                    <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                {priceRanges.map((range,index)=>(
                   <Checkbox key={index} label={`$ ${range}`}/>
                ))}
                </div>
                 <div className='px-5 pt-5 pb-7'>
                    <p className='font-medium text-gray-800 pb-2'>Sort Options</p>
                {sortOption.map((option,index)=>(
                   <RadioButton key={index} label={option} />
                ))}
                </div>
          </div>
       </div>
    </div>
  )
}

export default AllRooms