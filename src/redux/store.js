import { configureStore } from '@reduxjs/toolkit'
import bizsReducer from "./features/bizs/bizsSlice"

export const store = configureStore({
  reducer: {
    bizs: bizsReducer,
  },
})