import React, { useEffect, useState } from 'react'
import Title from "../Components/Titlte"
import { assets, userBookingsDummyData } from '../assets/assets'
import { UseAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'
const MyBooking = () => {
      const [bookings,setBokking] = useState([])
      const {user,currency,axios,getToken} = UseAppContext()
      const Mybookings = async()=>{
            try{
                  const response = await axios.get("/api/bookings/user",{
                        headers:{Authorization :`Bearer ${await getToken()}`}
                  })
                  if(response.data.success){
                        setBokking(response.data.bookings)
                  }
            }catch(err){
                  toast.error(err.response.data.message)
            }
      }
      useEffect(()=>{
      Mybookings()
      },[user])
  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-20 lg:24 xl:32'>
      <Title title="My-Bookings" subtitle="Easily manage your past, 
      current, and upcoming hotel reservations in one place. 
      Plan your trips seamlessly with just a few clicks"
      align="left" />
      <div className='max-w-6xl  mt-8 w-full text-gray-800'>
            <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b
            border-gray-300 font-medium text-base py-3'>
                  <div className='w-1/3'>Hotels</div>
                  <div className='w-1/3'>Date & Timings</div>
                  <div className='w-1/3'>Payments</div>
            </div>
            {
                  bookings.map((booking)=>(
                       <div key={booking._id} className='grid grid-cols-1 w-full border-b 
                        md:grid-cols-[3fr_2fr_1fr] border-gray-300 py-6 first:border-t'>
                        {/* hotel deatails */}
                         <div className='flex flex-col md:flex-row'>
                              <img src={booking.room.images[0]} alt="hotel-img" srcset="" 
                              className='min-md:w-44 rounded shadow object-cover'/>
                              <div className='flex flex-col gap-1.5 max-md:mt-3 md:ml-4'>
                                    <p className='font-playfair text-2xl'>{booking.hotel.name}
                                    <span className='font-inter text-sm'> ({booking.room.roomType})</span>    
                                    </p>
                                <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <img src={assets.locationIcon} alt="location-icon"  />
                                    <span>{booking.hotel.address}</span>
                                </div>
                                <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <img src={assets.guestsIcon} alt="guest-icon"  />
                                    <span>Guests :{booking.guests}</span>
                                </div>
                                <p className='text-base'>Total : {currency}  {booking.totalPrice}</p>
                              </div>
                         </div>

                        {/* data and timing  */}
                        <div className='flex flex-row items-center md:gap-12 gap-3 mt-3'>
                              <div>
                                    <p>Check-In:</p>
                                    <p>{new Date (booking.checkInDate).toDateString()}</p>
                              </div>
                              <div>
                                    <p>Check-Out:</p>
                                    <p>{new Date (booking.checkOutDate).toDateString()}</p>
                              </div>
                        </div>
                        {/* Payments */}
                        <div className='flex flex-col mt-4 md:mt-0 items-start justify-center '>
                              <div className='flex items-center gap-2'>
                                    <div className={`h-3  w-3 rounded-full ${booking.isPaid ?
                                          "bg-green-500" : "bg-red-500"
                                    }`}> </div>
                               <p className={`text-sm   ${booking.isPaid ?  "text-green-500" : "text-red-500"}`}>
                                    {booking.isPaid ? "Paid" : "Unpaid"}
                               </p>
                              {
                                    !booking.isPaid &&(
                                          <button className='px-4 py-1.5  text-xs border border-gray-400 rounded-full
                                          hover:border-gray-50 transition-all cursor-pointer'>
                                                Pay Now
                                          </button>
                                    )
                              }
                              </div>
                        </div>
                       </div> 
                  ))
            }
      </div>
    </div>
  )
}

export default MyBooking