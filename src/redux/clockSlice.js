const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: {
        clockedIn: false
    }
}

const clockSlice = createSlice({
    name: 'clock',
    initialState,
    reducers: {
        changeClockState: ( state, action ) => {
            state.value.clockedIn = action.payload.clockedIn
        }
    }
});

export const { changeClockState } = clockSlice.actions;
export default clockSlice.reducer;