import { createSlice } from "@reduxjs/toolkit";
import CodeType from "../../model/CodeType";
import CodePayload from "../../model/CodePayload";

const defaultMessage: CodePayload = {
    code: CodeType.OK,
    message: ''
}

const initialState: {codeMessage: CodePayload} = {
    codeMessage:  defaultMessage
    
}

const codeSlice = createSlice({
    initialState,
    name: 'codeState',
    reducers: {
        set: (state, data) => {
            state.codeMessage = data.payload
        },
        reset: (state) =>{
            state.codeMessage = initialState.codeMessage
        }
    }
});

export const codeActions = codeSlice.actions;
export const codeReducer = codeSlice.reducer;