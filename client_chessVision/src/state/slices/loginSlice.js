import { createSlice } from "@reduxjs/toolkit";
import  {login, logout}  from "../actions/LoginActions";

const initialState = {
    user: {},
    isLoading: false,
    error: null,
};


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null; 
            state.error = null; 
        });
    }
})

export const { updateUser } = loginSlice.actions;
export default loginSlice.reducer;