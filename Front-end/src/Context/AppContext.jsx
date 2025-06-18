import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext()

export const AppProvider = ({children})=>{

      const currency = import.meta.env.VITE_CURRENCY || "$"
      const navigate = useNavigate()
      const {user} = useUser()
      const {getToken} = useAuth()
      const [isOwner,setOwner] = useState(false)
      const [showhotelReg,SethotelReg] = useState(false)
      const [searchRecentCities,setRecentCities] = useState([])
      const [rooms,setrooms] = useState([])
      const fetchUser = async ()=>{
      try {
            const response = await axios.get("/api/user/",{headers:{Authorization 
            : `Bearer ${await getToken()}`}})
            if(response.data.success){
                  setOwner(response.data.role === "hotelOwner")
                  setRecentCities(response.data.recentSearchedcities)
            }
            else{
                  setTimeout(() => {
                  fetchUser() 
                  },5000);
            }     
      } catch (error) {
            toast.error(error.message)       
      }
      }
      useEffect(()=>{
         if(user){
            fetchUser()
         }
      },[user])
      const fetchRooms = async ()=>{
            try{
               const response = await axios.get("/api/rooms/",{headers:
                  {Authorization:`Bearer ${await getToken()}`}})
               setrooms(response.data.rooms)
            }catch(err){
                  toast.error(err.response.data.message)
            }
      }
      useEffect(()=>{
          fetchRooms()
      },[])
      const value ={
           currency,navigate,user,getToken,isOwner,setOwner,showhotelReg,SethotelReg,
           axios,searchRecentCities,setRecentCities ,getToken , rooms ,setrooms
      }
      return(
      <AppContext.Provider value={value}>
            {children}
      </AppContext.Provider>      
)}
export const UseAppContext = () => useContext(AppContext)