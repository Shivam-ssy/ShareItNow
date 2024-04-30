import { useState } from "react";
import HeaderHome from "./components/Header/HeaderHome";
import GetStarted from "./components/Page/GetStarted";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import config from "../Conf/cofig";
import "./App.css";
import Navigators from "./components/Header/Header";
import { Outlet } from "react-router-dom";



function App() {
  const [count, setCount] = useState(0);
  const [isuser, setUser] = useState("!user");
  const [validUser, setValidUser] = useState(false);
  const location=useLocation()
  const {params}=useParams()
    useEffect(()=>{
        const fetchUser= async ()=>{
            const fetchData= await fetch(config.getCurrentUser,{
                method:'GET',
                credentials:'include',
            })
            .then((fetchData)=>fetchData.json())
            
            console.log(fetchData)
            if(fetchData.statusCode===200){
                    setValidUser(true)
                    setUser(fetchData.data.name)

            }
        }
        fetchUser();

    },[location])
  return (
    <>
      <div className="w-full h-auto flex flex-col">
        <Navigators/>
      {validUser &&  <div className="h-20">
         <HeaderHome name={isuser} className=" fixed w-full" />
        </div>}
        <Outlet />

      </div>
    </>
  );
}

export default App;
