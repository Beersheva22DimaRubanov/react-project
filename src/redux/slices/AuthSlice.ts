import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

function getUser(input: String) {
    return input.toLowerCase().startsWith('admin') ? 'admin' : 'user'
}

const initialState: { user: 'user' | 'admin' | 'basic' } = {
    user: 'basic'
}

const slice = createSlice({
    initialState: initialState,
    name: 'userState',
    reducers: {
        setUser: (state, data) => {
            const inputUser = data.payload as string
            state.user = getUser(inputUser)
        },
        removeUser: (state) => {
            state.user = 'basic';
        }
    }
})

export const userActions = slice.actions;
export const userReducer = slice.reducer;