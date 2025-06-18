import React, { useEffect, useState } from 'react'
import Titlte from '../../Components/Titlte'
import { assets } from '../../assets/assets'
import { UseAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
      const {currency,axios,getToken,user} = UseAppContext()
      const [dashboarddata,setDashboarddata] = useState({
            bookings :[],
            totalbooking:0,
            totalrevenue:0
      })
      const fetchDashboardData = async ()=>{
            try{
                  const response = await axios.get("/api/bookings/hotel",{
                        headers:{Authorization:`Bearer ${await getToken()}`}
                  })
                  setDashboarddata(response.data.dashboardData)
            }catch(err)
            {
                  toast.error(err.response.data.message)
            }
      }
      useEffect(()=>{
          if(user){
            fetchDashboardData()
          }
      },[user])
  return (
    <div>
      <Titlte  align="left" font="outfit" title="Dashboard" 
      subtitle="Monitor your room listings , track-booking and analyze revenue-all in one place.
      Stay updated with real-time insights to ensure smooth operations" />
      <div className='flex gap-4 my-8 '>
            {/* total booking */}
            <div className='bg-blue-50 border rounded border-primary-10 flex p-4 pr-8 '>
                  <img src={assets.totalBookingIcon} alt="total-booking-icon" 
                  className='h-10 max-sm:hidden'/>
                  <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-blue-500 text-base'>Total Booking</p>
                        <p className='text-neutral-500 text-base'>{dashboarddata.totalbooking}</p>
                  </div>
            </div>
            {/* total revenue */}
            <div className='bg-blue-50 border rounded border-primary-10 flex p-4 pr-8 '>
                  <img src={assets.totalRevenueIcon} alt="total-booking-icon" 
                  className='h-10 max-sm:hidden'/>
                  <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-blue-500 text-base'>Total Revenue</p>
                        <p className='text-neutral-500 text-base'>{currency} {dashboarddata.totalrevenue}</p>
                  </div>
            </div>
      </div> 
      {/* recent booking */}
      <h2 className='text-xl text-blue-950/70 mb-5 font-medium'>Recent Bookings</h2>
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg  
      overflow-y-scroll man-h-80'>
            <table className='w-full'>
            <thead className='bg-gray-50'>
                  <tr>
                        <th className='py-3 px-4 text-gray-600 font-medium'>User Name</th>
                        <th className='py-3 px-4 text-gray-600 font-medium max-sm:hidden'>Room Name</th>
                        <th className='py-3 px-4 text-gray-600 font-medium text-center'>Total Amount</th>
                        <th className='py-3 px-4 text-gray-600 font-medium text-center'>Payment Status</th>
                  </tr>
            </thead>
            <tbody className='text-sm' >
                   {dashboarddata.bookings.map((item,index)=>(
                        <tr key={index}>

                            <td className='px-4 py-3 text-gra-700 border-t border-gray-300'>
                              {item.user.username}
                              </td>

                            <td className='px-4 py-3 text-gra-700 border-t border-gray-300 max-sm:hidden'>
                              {item.room.roomType}
                              </td>

                            <td className='px-4 py-3 text-gra-700 border-t border-gray-300 text-center'>
                              $ {item.totalPrice}
                              </td>

                            <td className='px-4 py-3 text-gra-700 border-t border-gray-300 flex'>
                              <button className={`py-1 px-3 text-sm rounded-full mx-auto 
                              {currency} {item.isPaid ? "bg-green-200 text-green-600 "
                                     : 
                              " bg-amber-200 text-yellow-600"}`}>
                                    {item.isPaid ? "Completed" : "Pending"}
                              </button>
                            </td>
                        </tr>
                   ))}
            </tbody>
            </table>
      </div>
    </div>
  )
}

export default Dashboard