import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './components/RegistorPages/Login.jsx'
import 'remixicon/fonts/remixicon.css'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import GetStarted from './components/Page/GetStarted.jsx'
import SignUp from './components/RegistorPages/Signup.jsx'
import Home from './components/Home/Home.jsx'
import Download from './components/Page/Download.jsx'
import Myfile from './components/mainRoutes/Myfiles.jsx'
import SharePage from './components/mainRoutes/Share.jsx'
import DirectShare from './components/mainRoutes/DirectShare.jsx'
import Profile from './components/mainRoutes/Profile.jsx'
const data=localStorage.getItem('token');
const router=createBrowserRouter(
  createRoutesFromElements(
   <Route path='/' element={<App/>}>
   <Route path='/' element={<GetStarted/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Signup' element={<SignUp/>}/>
   <Route path='/Home' element={<Home/>}/> 
   <Route path='/Home/share/upload' element={<SharePage/>}/> 
   <Route path='/Home/share/directshare' element={<DirectShare/>}/> 
   <Route path='/Home/myfile' element={<Myfile/>}/>
    <Route path='/download/:uuid' element={<Download/>}/>
    <Route path='/home/profile' element={<Profile/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  
  
    <RouterProvider router={router}/>
 
)
