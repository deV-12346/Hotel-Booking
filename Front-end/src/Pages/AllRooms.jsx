import React, { useState } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import {  useSearchParams } from 'react-router-dom'
import StarRating from '../Components/StarRating'
import { UseAppContext } from '../Context/AppContext'
import { useMemo } from 'react'

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
      const [searchParams,setearchParams] = useSearchParams()
      const {rooms,navigate,currency} = UseAppContext()
      const [openfilters,setopenfilter] = useState(false)
      const [selectedFilter,setSelectedFilter] = useState({
        roomTypes:[],
        priceRanges:[]
      })
      const [selectSort,setSelectSort] = useState("")
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

  //handle changes for filter and sorting
  const handleFilterChange = (checked,type,value)=>{
    setSelectedFilter((prevFilter)=>{
      const updatedFilter = {...prevFilter}
      if(checked){
          if (!updatedFilter[type]) updatedFilter[type] = []  
           updatedFilter[type].push(value)
      }
      else{
        updatedFilter[type] = updatedFilter[type].filter(item=>item!==value)
      }
      return updatedFilter
    })
  }

  const handlesortChange = (sortOption) =>{
    setSelectSort(sortOption)
  }
  //function to check if a room matches the selected room types 
  const matchRoomType = (room)=>{
    return selectedFilter.roomTypes.length === 0 || selectedFilter.roomTypes.includes(room.roomType)
  }

  //selected room price
  const matchPriceRange = (room)=>{
     return selectedFilter.priceRanges.length === 0 || 
     selectedFilter.priceRanges.some(range=>{
      const [min,max] = range.split(" to ").map(Number)
      return room.priceRange >=min && room.priceRange <= max
     })
  }
  //function to sort room based on the selected room option
  const setRooms = (a,b)=>{
    if(selectSort === "Price Low to High"){
      return a.pricePerNight - b.pricePerNight
    }
    if(selectSort === "Price High to Low"){
      return b.pricePerNight - a.pricePerNight
    }
    if(selectSort === "Newest First"){
      return new Date(b.createAt) -  new Date(a.createAt)
    }
    return 0
  }
  //filter destination
  const filterDestination = (room)=>{
    const destination = searchParams.get("destination")
    if(!destination) return true
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase())
  }
  //Filter
  const filteredRooms = useMemo(()=>{
    return rooms.filter(room=>
      matchPriceRange(room) && matchRoomType(room) && filterDestination(room)).sort(setRooms)
  },[rooms,selectSort,selectedFilter,searchParams])
  //clear filter
  const clearfilter = ()=>{
    setSelectedFilter({
      roomTypes:[],
      priceRanges:[]
    })
    setSelectSort("")
    setearchParams({})
  }
  return (
   <div className="flex flex-col-reverse lg:flex-row gap-8 pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
  {/* Room List */}
  <div className="flex-1">
    <div className="mb-6">
      <h1 className="font-playfair text-3xl md:text-4xl">Hotel Rooms</h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-2xl">
        Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
      </p>
    </div>

    {filteredRooms.map((room) => (
      <div
        key={room._id}
        className="flex flex-col md:flex-row items-start py-5 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
      >
        <img
          src={room.images[0]}
          alt={room.hotel.name}
          onClick={() => {
            navigate(`/rooms/${room._id}`);
            scrollTo(0, 0);
          }}
          className="w-full md:w-1/2 max-h-64 rounded-xl shadow-lg object-cover cursor-pointer"
        />
        <div className="md:w-1/2 flex flex-col gap-2">
          <p className="text-gray-500">{room.hotel.city}</p>
          <p
            onClick={() => {
              navigate(`/rooms/${room._id}`);
              scrollTo(0, 0);
            }}
            className="text-gray-800 cursor-pointer font-playfair text-2xl md:text-3xl"
          >
            {room.hotel.name}
          </p>
          <div className="flex items-center justify-start">
            <StarRating />
            <p className="ml-2">200+ reviews</p>
          </div>
          <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
            <img src={assets.locationIcon} className="w-4 h-4" alt="location" />
            <span>{room.hotel.name}</span>
          </div>
          <div className="flex flex-wrap items-center mt-4 mb-6 gap-3">
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f5f5ff]/70"
              >
                <img src={facilityIcons[item]} alt={item} className="w-4 h-4" />
                <p className="text-xs">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-lg md:text-xl font-medium text-gray-800">
            {currency}
            {room.pricePerNight}/Night
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Filters */}
  <div className="w-full lg:w-80 bg-white border border-gray-300 text-gray-600">
    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-300">
      <p className="text-base font-medium text-gray-800">FILTERS</p>
      <div className="text-xs cursor-pointer">
        <span className="lg:hidden" onClick={() => { setopenfilter(!openfilters); clearfilter(); }}>
          {openfilters ? "HIDE" : "SHOW"}
        </span>
        <span className="hidden lg:block" onClick={clearfilter}>Clear</span>
      </div>
    </div>

    <div className={`${openfilters ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
      <div className="px-5 pt-5">
        <p className="font-medium text-gray-800 pb-2">Popular filters</p>
        {roomTypes.map((room, index) => (
          <Checkbox
            key={index}
            label={room}
            selected={selectedFilter.roomTypes.includes(room)}
            onChange={(checked) => handleFilterChange(checked, "roomTypes", room)}
          />
        ))}
      </div>

      <div className="px-5 pt-5">
        <p className="font-medium text-gray-800 pb-2">Price Range</p>
        {priceRanges.map((range, index) => (
          <Checkbox
            key={index}
            label={`${currency} ${range}`}
            selected={selectedFilter.priceRanges.includes(range)}
            onChange={(checked) => handleFilterChange(checked, "priceRanges", range)}
          />
        ))}
      </div>

      <div className="px-5 pt-5 pb-7">
        <p className="font-medium text-gray-800 pb-2">Sort Options</p>
        {sortOption.map((option, index) => (
          <RadioButton
            key={index}
            label={option}
            selected={selectSort === option}
            onChange={() => handlesortChange(option)}
          />
        ))}
      </div>
    </div>
  </div>
</div>
  )
}

export default AllRooms