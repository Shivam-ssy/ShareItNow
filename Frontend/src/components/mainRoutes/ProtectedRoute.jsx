import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../Page/Loader'
function ProtectedRoute({children}) {
    const auth=useSelector((state)=>state.auth.status)
    const loading=useSelector((state)=>state.auth.loading)
    const location=useLocation()    
    if(!auth && loading &&  (location.pathname==="/" || location.pathname==="/Login" || location.pathname==="/Signup")){
      return children
    }
   if(auth && !loading && (location.pathname==="/" || location.pathname==="/Login" || location.pathname==="/Signup")){
      console.log("navigated",location.pathname);
      
      return <Navigate to="/Home"/>
    }
    else{
     if(!loading){

       if(auth)
       return children
       else
       return <Navigate to="/Login"/>
  
     }
     else{
      return <Loader/>
     }
      
    }
  // return (
  //   <>
  //       {
  //          ! auth && !loading? <Navigate to="/Login"/>:children
  //       }
  //   </>
  // )
}

export default ProtectedRoute
