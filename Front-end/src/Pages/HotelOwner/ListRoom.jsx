import React, { useEffect, useState } from 'react'
import Titlte from '../../Components/Titlte'
import { UseAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'

const ListRoom = () => {
   const [rooms,setrooms] = useState([])
   const {currency,getToken,user,axios} = UseAppContext()
   const fetchrooms = async ()=>{
    try {
      const response = await axios.get("/api/rooms/owner",{
        headers:{Authorization:`Bearer ${await getToken()}`}
      })
      if(response.data.success){
        setrooms(response.data.rooms)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
   }
   useEffect(()=>{
      if(user){
        fetchrooms()
      }
   },[user])
   // toggleRoomAvailability
  const toggleRoomAvailability = async (roomId)=>{

    try {
      const response = await axios.post("/api/rooms/toogle-availability",{roomId},{
        headers:{Authorization:`Bearer ${await getToken()}`}
      })
      toast.success(response.data.message)
      const updatedRooms = rooms.map(room =>
      room._id === roomId ? { ...room, isAvailable: !room.isAvailable } : room
      );
  setrooms(updatedRooms);
      fetchrooms()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <Titlte align="left" font="outfit" title="Room Listings" 
      subtitle="View,edit or manage all listed rooms. Keep the information up-todate to provide the best
      exprience for users" />
      <p className='text-gray-500 mt-8 '>All Rooms</p>
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg
      max-h-80 overflow-y-scroll mt-3'>
        <table className='w-full'>
           <thead className='bg-gray-50'>
                  <tr>
                      <th className='py-3 px-4 text-gray-600 font-medium'>Name</th>
                      <th className='py-3 px-4 text-gray-600 font-medium'>Facility</th>
                      <th className='py-3 px-4 text-gray-600 font-medium'>Price / night</th>
                      <th className='py-3 px-4 text-gray-600 font-medium text-center'>Actions</th>
                  </tr>
            </thead>
            <tbody className='text-sm'>
            {rooms.map((item,index)=>(
               <tr key={index}>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                    {item.roomType}
                  </td>

                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                    {item.amenities.join(", ")}
                  </td>

                   <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                   {currency} {item.pricePerNight}
                  </td>

                   <td className='py-3 px-4 text-red-500 border-t border-gray-300 text-sm
                   text-center'>
                    <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                      <input type="checkbox" 
                      className='sr-only peer' 
                      onChange={()=>toggleRoomAvailability(item._id)}
                      checked={item.isAvailable} />
                      <div className='w-12 h-7 bg-slate-300 rounded-full  peer 
                      peer-checked:bg-blue-600 transition-colors duration-200 '>
                        <span className={`dot absolute top-1 ${ item.isAvailable ? "left-6 " : "left-1"} w-5 h-5 bg-white
                         rounded-full transition-transform duration-400 ease-in-out 
                        peer-checked:translate-x-5`}></span>
                      </div>
                    </label>
                  </td>
               </tr>
            ))}
            </tbody>
        </table>

      </div>
    </div>
  )
}

export default ListRoom