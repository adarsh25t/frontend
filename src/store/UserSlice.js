import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { url } from '../assets/images/assets';

export const fetchuserDetails = createAsyncThunk('/user/getuserdata', async () => {
    const response = await axios.get(url.userdetails,{ withCredentials: true })
    return response?.data
})

export const fetchallUsers = createAsyncThunk('/user/getallusers', async () => {
    const response = await axios.get(url.allusers, { withCredentials: true });
    return response?.data
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status:"nothing",
    },
    reducers: {
        addUser: (state, action) => {
            state["userdetails"] = action.payload
        },
        updateStatus: (state, action) => {
            state["status"] = action.payload
        }
    },
    extraReducers(builder){
        builder.addCase(fetchuserDetails.fulfilled,(state, action) => {
            state.status = "succeeded"
            state["userdetails"] = action.payload.data
        }),
        builder.addCase(fetchallUsers.pending,(state, action) => {
            state.status = "pending"
        }),
        builder.addCase(fetchallUsers.fulfilled,(state, action) => {
            state.status = "succeeded"
            state["allusers"] = action.payload?.data
        })
    }
  });

  export const { addUser,getUserDetails,setAllUsers,updateStatus } = userSlice.actions;
  
  export default userSlice.reducer;