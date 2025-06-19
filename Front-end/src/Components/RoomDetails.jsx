import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData } from '../assets/assets'
import StarRating from './StarRating'
import { UseAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'

const RoomDetails = () => {
  const {currency,rooms,axios,navigate,getToken} = UseAppContext()
      const {id} = useParams()
      const [room,setRoom] = useState(null)
      const [mainImage,setmainImage] = useState(null)
      useEffect(()=>{
        const room = rooms.find((room)=>room._id === id)
        room && setRoom(room)
        room && setmainImage(room.images[0])
      },[rooms])
      const [checkInDate,setcheckInDate] = useState(null)
      const [checkOutDate,setcheckOutDate] = useState(null)
      const [guests,setguests] = useState(1)
      const [isAvailable,setisAvailable] = useState(false)

      // check availability
      const checkAvaialability = async ()=>{
        try{
        if(checkInDate >= checkOutDate ){
          toast.error("Check In date should be less than check Out ")
          return
        }
        const response = await axios.post("/api/bookings/check-availablity",{room:id,checkInDate,checkOutDate})
        if(response.data.success){
          setisAvailable(true)
          toast.success(response.data.message)
        }
        else{
          setisAvailable(false)
          toast.error(response.data.message)
        }
        }catch(err){
          toast.error(err.response.data.message)
        }
      }
    //handle booking
    const HandleBooking = async(e)=>{
      e.preventDefault()
      try{
      if(!isAvailable){
        await checkAvaialability()
        return
      }
      else {const response = await axios.post("/api/bookings/book",{room:id,checkInDate,checkOutDate,
        guests,paymentMethod : "Pay At Hotel"},
        {headers:{Authorization:`Bearer ${await getToken()}`}})
      if(response.data.success){
        toast.success(response.data.message)
        navigate("/my-bookings")
        scrollTo(0,0)
      }
    }
      }catch(err){
      toast.error(err.message)
    }
  }

  return room && (
    <div className='py-28 md:35 px-4 md:px-16 lg:px-24 xl:px-32'>
     {/* room details */}
     <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
      <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name}
       <span className='pl-2 font-inter text-sm'>({room.roomType})</span>
       </h1>
      <p className='text-sm font-inter py-1.5 px-3 bg-orange-500 text-white rounded-full'>
      20% OFF</p>
     </div>
     {/* rating */}
     <div className='flex items-center gap-1 mt-2'>
      <StarRating />
      <p className='ml-2'>200+ reviews</p>
     </div>
     {/* room address */}
     <div className='flex items-center gap-1 mt-2 text-gray-400'>
      <img src={assets.locationIcon} alt='location-icon' />
      <p>{room.hotel.address}</p>
     </div>
     <div className='flex flex-col  lg:flex-row mt-6 gap-6'>
      <div className='lg:w-1/2 w-full'>
        <img src={mainImage} alt="mainimage"
        className='w-full rounded-xl bg-cover shadow-lg' />
      </div>
      <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
        {room.images.length > 0 && 
         room.images.map((img,index)=>(
          <img  onClick={()=>setmainImage(img)}
          src={img}  key={index}
          className={`w-full rounded-xl shadow-md object-cover cursor--pointer
          ${mainImage === img && "outline-4 outline-orange-300"}`}/>
         ))
        }
      </div>
    </div>
     {/* Room Highlights */}
     <div className='flex flex-col md:flex-row  md:justify-between mt-10'>
       <div>
        <h1 className='text-3xl md:text-4xl font-playfair'>Exprience Luxury like never Before</h1>
        <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
          {
            room.amenities.map((amenity ,index)=>(
            <div key={index}
            className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
              <img src={facilityIcons[amenity]} alt="amenity"
              className='w-5 h-5'  />
              <p className='text-sm'>{amenity}</p>
           </div>
          )) 
          }
        </div>
       </div>
       <p className='text-2xl font-medium'>{currency}  {room.pricePerNight}/Night</p>
     </div>
     {/* check in check out form */}
     <form onSubmit={HandleBooking} action="" className='flex flex-col md:flex-row items-start md:items-center 
     bg-white  shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'> 
      <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center
      gap-4 md:gap-10 text-gray-500 '>
           <div className='flex flex-col'>
            <label htmlFor="Checkin" className='font-medium'>Check In</label>
            <input type="date"  id="CheckIn" placeholder='Check In'
            onChange={(e)=>setcheckInDate(e.target.value)} min={new Date().toISOString().split("T")[0]}
            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
            </div> 
            <div className='w-px h-15 bg-gray-400 max-md:hidden'></div>
            <div>
            <label htmlFor="Checkout" className='font-medium'>Check Out</label>
            <input type="date"  id="ChekcoutDate" placeholder='Check Out'
            onChange={(e)=>setcheckOutDate(e.target.value)} min={checkInDate} disabled={!checkInDate}
            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
            </div> 
            <div className='w-px h-15 bg-gray-400 max-md:hidden'></div>
            <div className='flex flex-col'>
            <label htmlFor="Guests" className='font-medium'>Guests</label>
            <input type="number"  id="guests" placeholder='1'
            onChange={(e)=>setguests(e.target.value)} value={guests}
            className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
            </div> 

      </div>
      <button type='submit' className='bg-black hover:bg-primary/dull  active:scale-95
      transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 
      py-3 md:py-4 text-base  cursour-pointer md:ml-10'>
      {isAvailable ? "Book Now" : "Check Availability" }
      </button>
     </form>
     {/* common specifications  */}
    <div>
      {roomCommonData.map((spec,index)=>(
        <div key={index} className='flex items-start gap-4 mt-5'>
          <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
          <div>
            <p className='text-base'>{spec.title}</p>
            <p className='text-gray-800'>{spec.description}</p>
          </div>
        </div>
      )) }
    </div>
    <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
      <p>Guests will be allocated on the ground floor according to availability.
         You get a comfortable Two bedroom apartment has a true city feeling. 
         The price quoted is for two guest, at the guest slot please mark the number of guests 
         to get the exact price for groups. The Guests will be allocated ground floor according
          to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>
    </div>
    
    {/* hosted by  */}
    <div className='flex flex-col items-start gap-4'>
      <div className='flex gap-4'>
        <img src={room.hotel.owner.image} alt="host"
        className='w-14 h-14 md:w-18 md:h-18 rounded-full' />
        <div>
          <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
          <div className='flex items-center mt-1'>
            <StarRating />
            <p className='ml-2'>200+ reviews</p>
          </div>
        </div>
      </div>
       <button className='px-6 py-3 mt-4 rounded text-white bg-gray-900 hover:bg-gray-600
       transition-all cursor-pointer'>Contact Now</button>
    </div>

    </div>
  )
}

export default RoomDetails