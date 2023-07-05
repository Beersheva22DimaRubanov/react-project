import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './slices/AuthSlice';
import { useSelector } from 'react-redux';
import UserData from '../model/UserData';
import { codeReducer } from './slices/codeSlice';
import CodePayload from '../model/CodePayload';

export const store = configureStore({
    reducer: {
        userState: userReducer,
        codeState: codeReducer
    }
});

export function useSelectorUser() {
    return useSelector<any, UserData>(state => state.userState.userData) ;
 }

export function useSelectorCode(){
    return useSelector<any, CodePayload>(state => state.codeState.codeMessage)
}


 