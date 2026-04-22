import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAlbum = createAsyncThunk('Album', async () => {
  try {
    const responce = await axios.get('http://localhost:3000/api/music/albums', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    return responce.data.albums
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})

const albumSlice = createSlice({
  name: 'Album',

  initialState: {
    data: [],
    isLoading: false,
    isError: false
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.data = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchAlbum.pending, (state) => {
      state.isLoading = true
      state.data = []
    })
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })
  }
})

export const { data, isLoading, isError } = albumSlice.actions
export default albumSlice.reducer