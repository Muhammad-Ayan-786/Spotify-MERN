import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMusic = createAsyncThunk('Music', async () => {
  try {
    const responce = await axios.get('http://localhost:3000/api/music', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    return responce.data.musics
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})

const musicSlice = createSlice({
  name: 'Music',

  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMusic.fulfilled, (state, action) => {
      state.data = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchMusic.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchMusic.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })
  }
})

export const { data, isLoading, isError } = musicSlice.actions
export default musicSlice.reducer