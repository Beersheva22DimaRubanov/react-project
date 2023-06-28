import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import  UserData  from "../../model/UserData";


const AUTH_ITEM = "auth-item";

const initialState: { userData: UserData } = {
    userData:  getUserData()
}

const slice = createSlice({
    initialState: initialState,
    name: 'userState',
    reducers: {
        setUser: (state, data) => {
            if(data.payload){
                localStorage.setItem(AUTH_ITEM, JSON.stringify(data.payload))
                state.userData = data.payload;
            }
        },
        reset: (state) => {
            state.userData = null;
            localStorage.removeItem(AUTH_ITEM);
        }
    }
})

export const userActions = slice.actions;
export const userReducer = slice.reducer;

function getUserData(): UserData {
    const userDataJson = localStorage.getItem(AUTH_ITEM) || ''
    let res: UserData = null;
    if(userDataJson){
        res = JSON.parse(userDataJson)
    }
    return res;
}
