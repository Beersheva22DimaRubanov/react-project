import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './slices/AuthSlice';
import { useSelector } from 'react-redux';
import UserData from '../model/UserData';

export const store = configureStore({
    reducer: {
        userState: userReducer
    }
});

export function useSelectorUser() {
    return useSelector<any, UserData>(state => state.userState.userData) ;
 }



 