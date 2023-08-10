import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import navigationSlice from './navigationSlice';
import clockSlice from './clockSlice';
import recordSlice from './recordSlice';
import shiftSlice from './shiftSlice';

export default configureStore({
    reducer: {
        userSlice,
        navigationSlice,
        clockSlice,
        recordSlice,
        shiftSlice
    }
})