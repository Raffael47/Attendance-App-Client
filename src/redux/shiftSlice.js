const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: {
        refresh: false,
        ShiftId: '',
    }
};

const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
        setShiftId: ( state, action ) => {
            state.value.ShiftId = action.payload.ShiftId;
            state.value.refresh = !state.value.refresh;
        }
    }
});

export const { setShiftId } = shiftSlice.actions;
export default shiftSlice.reducer;