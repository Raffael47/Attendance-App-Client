import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        name: '',
        email: '',
        imgProfile: '',
        birthdate: '',
        Role: {},
        Shift: {},
        salary: 0,
        isAdmin: false,
        id: 0
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: ( state, action ) => {
            state.value.name = action.payload.name
            state.value.email = action.payload.email
            state.value.imgProfile = action.payload.imgProfile
            state.value.birthdate = action.payload.birthdate
            state.value.Role = action.payload.Role
            state.value.Shift = action.payload.Shift
            state.value.salary = action.payload.salary
            state.value.isAdmin = action.payload.isAdmin
            state.value.id = action.payload.id
        },
        logout: ( state, action ) => {
            state.value.name = ''
            state.value.email = ''
            state.value.imgProfile = ''
            state.value.birthday = ''
            state.value.Role = {}
            state.value.Shift = {}
            state.value.salary = 0
            state.value.isAdmin = false
            state.value.id = 0
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;