import { useState } from "react";
import HeaderHome from "./components/Header/HeaderHome";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import config from "../Conf/cofig";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loader, login } from "./store/auth.slice";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      dispatch(loader())
      const userData = await fetch(config.getCurrentUser, {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json());

      if (userData.statusCode === 200) {
        dispatch(login(userData.data))
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <div className="w-full h-auto flex flex-col">
        <div className="h-[80px] w-full">
          <HeaderHome className=" fixed w-full" />
        </div>

        <Outlet />
      </div>
    </>
  );
}

export default App;
