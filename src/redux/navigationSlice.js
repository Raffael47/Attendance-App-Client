const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: {
        currentUrl: '/'
    }
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        changeUrl: ( state, action ) => {
            state.value.currentUrl = action.payload.currentUrl
        }
    }
});

export const { changeUrl } = navigationSlice.actions;
export default navigationSlice.reducer;