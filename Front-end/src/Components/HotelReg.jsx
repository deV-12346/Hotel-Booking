import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { UseAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'


const HotelReg = () => {
      const {SethotelReg,axios ,getToken ,setOwner} = UseAppContext()
      const [name,setname] = useState("")
      const [contact,setcontact] = useState("")
      const [address,setadddress] = useState("")
      const [city,setcity]=useState("")

      const handleSubmit = async (event) =>{
            try {
                  event.preventDefault()
                  const response = await axios.post("/api/hotels/",{name,address,contact,city},{
                        headers:{Authorization : `Bearer ${await getToken()}`}
                  })
                  if(response.data.success){
                      toast.success(response.data.message)
                      setOwner(true)
                      SethotelReg(false)
                  }
            } catch (error) {
                  toast.error(error.response.data.message)
            }
      }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0  z-100 flex items-center justify-center
    bg-black/70'>
      <form action="" className='flex  bg-white rounded-xl max-w-4xl
      max-md:mx-2' onSubmit={handleSubmit} onClick={(e)=>e.stopPropagation()}>
            <img src={assets.regImage} alt="registration-image" className='w-1/2
            rounded-xl hidden md:block'  />
            <div className='relative flex flex-col items-center md:w-1/2 p-8
            md:p-10'>
                  <img src={assets.closeIcon} alt="cloase-icon" 
                  className='absolute top-4 right-4 h-4 w-4 cursor-pointer' onClick={()=>SethotelReg(false)} />
                  <p className='text-2xl font-semibold mt-6'>Register your hotel</p>
                  {/* hotel name */}

                  <div className='w-full mt-4'>

                      <label htmlFor="name" className='font-medium text-gray-500'
                      >Hotel Name</label>
                      <input type="text" placeholder='Type here' id='name'
                      onChange={(e)=>setname(e.target.value)} value={name}
                      className='border  border-gray-200  rounded w-full px-3 py-2.5 mt-1 font-light
                      outline-indigo-300' required/>

                  </div>

                  <div className='w-full mt-4'>

                      <label htmlFor="contact" className='font-medium text-gray-500'
                      >Phone</label>
                      <input type="text" placeholder='Type here' id='contact'
                       onChange={(e)=>setcontact(e.target.value)} value={contact}
                      className='border  border-gray-200  rounded w-full px-3 py-2.5 mt-1 font-light
                      outline-indigo-300' required/>

                  </div>

                  <div className='w-full mt-4'>

                      <label htmlFor="address" className='font-medium text-gray-500'
                      >Address</label>
                      <input type="text" placeholder='Type here' id='address'
                       onChange={(e)=>setadddress(e.target.value)} value={address}
                      className='border  border-gray-200  rounded w-full px-3 py-2.5 mt-1 font-light
                      outline-indigo-300' required/>

                  </div>
                  <div className='w-full mt-4 max-w-60 mr-auto'>
                        <label htmlFor="city" className='font-medium text-gray-500'>City</label>
                        <select  id="city" 
                         onChange={(e)=>setcity(e.target.value)}  value={city}
                         className='border border-gray-200 rounded w-full
                         px-3 py-2.5 mt-1 outline-indigo-500 font-light' required>
                              <option value="">Select City</option>
                              {cities.map((city)=>(
                                    <option key={city} 
                                    value={city}>{city}</option>
                              ))}
                         </select>
                  </div>

                  <button  type="submit" className='bg-indigo-500 hover:bg-indigo-600 text-white 
                  transition-all mr-auto px-4 py-2 mt-6 cursor-pointer rounded'>Register</button>
            </div>
      </form>
    </div>
  )
}

export default HotelReg