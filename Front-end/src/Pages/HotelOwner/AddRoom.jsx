import React, { useState } from 'react'
import Title from "../../Components/Titlte"
import { assets } from '../../assets/assets'
import { UseAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'
const AddRoom = () => {
  const {axios,getToken} = UseAppContext()
  const [loading,setloading] = useState(false)
   const [images,setimages] = useState({
       1:null,
       2:null,
       3:null,
       4:null
   })
  const [inputs,setInputs] = useState({
       roomType:"",
       pricePerNight:0,
       amenitites:{
         'Free wifi' : false,
         'Free Breakfast' : false,
         'Room Service' : false,
         'Mountain view' : false,
         'Pool access': false
       }
  })
   const handleSubmit = async (e) =>{

    const formdata = new FormData
    formdata.append("roomType",inputs.roomType)
    formdata.append("pricePerNight",inputs.pricePerNight)

    //converting amenities to arraya and keeping only enabled ameneities
    const amenities = Object.keys(inputs.amenitites).filter((key=>inputs.amenitites[key]))
    formdata.append("amenities",JSON.stringify(amenities))
    //for images
    Object.keys(images).forEach((key)=>(
      images[key] && formdata.append("images",images[key])
    ))
    e.preventDefault()
    if(!inputs.roomType || !inputs.pricePerNight || !inputs.amenitites ||
      !Object.values(images).some(image=>image))
      {
        toast.error("Please fill all the details")
        return
      }
    try {
      const response = await axios.post("/api/rooms/",formdata , {headers:{
        Authorization:`Bearer ${await getToken()}`
      }})
      if(response.data.success){
        toast.success(response.data.message)
        setloading(true)
        setInputs({
          roomType:"",
       pricePerNight:0,
       amenitites:{
         'Free wifi' : false,
         'Free Breakfast' : false,
         'Room Service' : false,
         'Mountain view' : false,
         'Pool access': false
       }})
       setimages({ 1:null,
       2:null,
       3:null,
       4:null
      })
      }
    } catch (error) {
       toast.error(error.response.data.message)
    }finally{
         setloading(false)
    }
   }

  return (
    <form action="">
      <Title align="left" font="outfit" 
      title="Add Room" subtitle="Fill in the details carefully and accurate room deatils 
      pricing ,amenitities ,to ehnace the user booking exprience " />
      {/* images area */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap '>
      {Object.keys(images).map((key)=>(
          <label id={`roomImage${key}`} key={key}>
             <img src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea } 
             alt="image" className='max-h-13 cursor-pointer opcity-80' />
             <input type="file"  accept='image/*' key={`roomImage${key}`}
             onChange={e=>setimages({...images,[key] : e.target.files[0]})} hidden/>
          </label>
      ))}
      </div>
      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4 '>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select value={inputs.roomType}
          onChange={e=>setInputs({...inputs,roomType:e.target.value})} className='border border-gray-300 opacity-70 
          mt-1 rounded p-2 w-full'>
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Bed">Luxury Bed</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
        <p className='text-gray-800 mt-4'>Price
          <span className='text-sm'>/night</span>
        </p>
        <input type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24'
        value={inputs.pricePerNight} onChange={e=>setInputs({...inputs,pricePerNight:e.target.value})} />
      </div>

      </div>
      <p className='text-gray-800 mt-4'>Amenitites</p>
      <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
        {Object.keys(inputs.amenitites).map((amenity , index)=>(
          <div key={index}>
              <input type="checkbox"  id={`amenitites${index+1}`}
              checked={inputs.amenitites[amenity]} onChange={()=>setInputs({...inputs,
                amenitites:{...inputs.amenitites,[amenity]:!inputs.amenitites[amenity]}
              })} />
              <label htmlFor={`amenitites${index+1}`}> {amenity}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className='bg-blue-600 text-white px-8 py-2 rounded mt-3 cursor-pointer'>
      { loading ? "Adding"  : "Add Room" }
      </button>
    </form>
  )
}

export default AddRoom