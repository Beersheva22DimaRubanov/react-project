import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './slices/AuthSlice';
import { useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        userState: userReducer
    }
});

export function useSelectorUser() {
    return useSelector<any, 'admin'|'user'>(state => state.userState.user) ;
 }



 