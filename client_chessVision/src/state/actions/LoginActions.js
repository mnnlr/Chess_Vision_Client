import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultAxios } from "../../customAxios/defaultAxios";

const login = createAsyncThunk("login", 
    async (DataToVerify, { rejectWithValue }) => {
        console.log('datatova', DataToVerify);
        try{
            const {data, status} = await defaultAxios.post('signin', DataToVerify.formData);
            console.log('data and status is---->', data, status);
            if(status === 200){
                return data.Data;
            }
        }catch (error){
            return rejectWithValue(error.response.data.message);
        }
    }
)

const logout = createAsyncThunk("logout", async () => {
    return null; 
});

export { login, logout };