import { createSlice } from "@reduxjs/toolkit";

function getUser(input: String){
    if(input){
        return input.toLowerCase().startsWith('admin')? 'admin': 'user'
    } else{
        return 'basic'
    }
}

const initialState: {user: 'user'|'admin'|'basic'} = {
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
        removeUser: (state) =>{
            state = initialState;
        }
    }
})

export const userActions = slice.actions;
export const userReducer = slice.reducer;