import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import config from "../../Conf/cofig";
const initialState={
    status:false,
    userData:null,
    loading:true,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loader:(state)=>{
            state.loading=true
        },
        login: (state,action)=>{
            state.loading=false,
            state.status=true,
            state.userData=action.payload
        },
        logout:(state)=>{
            state.status=false,
            state.userData=null
        }

    }
})

export const {login,loader, logout}=authSlice.actions;
export default authSlice.reducer