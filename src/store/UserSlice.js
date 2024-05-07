import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { url } from '../assets/images/assets';

export const fetchuserDetails = createAsyncThunk('/user/getuserdata', async () => {
    const response = await axios.get(url.userdetails,{ withCredentials: true })
    return response?.data
})

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        addUser: (state, action) => {
            state["userdetails"] = action.payload
        }
    },
    extraReducers(builder){
        builder.addCase(fetchuserDetails.fulfilled,(state, action) => {
            state.status = "succeeded"
            state["userdetails"] = action.payload.data
        })
    }
  });

  export const { addUser,getUserDetails } = userSlice.actions;
  
  export default userSlice.reducer;