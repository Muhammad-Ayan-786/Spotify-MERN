import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAlbumById = createAsyncThunk('ID_Album', async (params) => {
  if (!params.albumId) {
    throw new Error('albumId is required');
  }

  try {
    const responce = await axios.get(`http://localhost:3000/api/music/albums/${params.albumId}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
    return responce.data.album
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})

const albumByIdSlice = createSlice({
  name: 'ID_Album',

  initialState: {
    IdAlbumData: [],
    isLoading: false,
    isError: false
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAlbumById.fulfilled, (state, action) => {
      state.IdAlbumData = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchAlbumById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAlbumById.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })
  }
})

export const { IdAlbumData, isLoading, isError } = albumByIdSlice.actions
export default albumByIdSlice.reducer