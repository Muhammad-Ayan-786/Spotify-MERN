import { configureStore } from "@reduxjs/toolkit"
import musicReducer from "./features/musicAPI";
import albumReducer from "./features/albumAPI";
import albumByIdReducer from "./features/albumByIdAPI";

export const store = configureStore({
  reducer: {
    music: musicReducer,
    album: albumReducer,
    albumById: albumByIdReducer
  }
})