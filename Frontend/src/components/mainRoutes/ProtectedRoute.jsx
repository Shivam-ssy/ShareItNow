import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({children}) {
    const auth=useSelector((state)=>state.auth.status)
    const loading=useSelector((state)=>state.auth.loading)
  return (
    <>
        {
           ! auth && !loading? <Navigate to="/Login"/>:children
        }
    </>
  )
}

export default ProtectedRoute
