import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    progress: 0,
};
const topLoadingSlice = createSlice({
    name: "topLoading",
    initialState,
    reducers: {
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
    },
});
export const { setProgress } = topLoadingSlice.actions;
export default topLoadingSlice.reducer;
