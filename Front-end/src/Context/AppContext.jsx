import axios from "axios"
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

const { createContext, useContext } = require("react");

const AppContext = createContext()

export const AppProvider = ({children})=>{
      
      const currency = import.meta.env.VITE_CURRENCY || "$"
      const navigate = useNavigate()

      const value ={
           
      }
      return(
      <AppContext.Provider value={value}>
            {children}
      </AppContext.Provider>      
)}
export const UseAppContext = () => useContext(AppContext)