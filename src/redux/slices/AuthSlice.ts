import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

function getUser(input: String) {
    return input.toLowerCase().startsWith('admin') ? 'admin' : 'user'
}
const AUTH_ITEM = "auth-item";


const initialState: { user: string } = {
    user:  localStorage.getItem(AUTH_ITEM)?? 'basic'
}

const slice = createSlice({
    initialState: initialState,
    name: 'userState',
    reducers: {
        setUser: (state, data) => {
            const user = getUser(data.payload)
            state.user = user;
            localStorage.setItem(AUTH_ITEM, user);

        },
        removeUser: (state) => {
            state.user = 'basic';
            localStorage.removeItem(AUTH_ITEM);
        }
    }
})

export const userActions = slice.actions;
export const userReducer = slice.reducer;