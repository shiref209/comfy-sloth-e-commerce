import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const {loginWithRedirect,logout,user}=useAuth0();
  const [isUser,setIsUser]=useState(null);
  useEffect(()=>{
    setIsUser(user)
  },[user])
  return (
    <UserContext.Provider value={{loginWithRedirect,logout,isUser}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
