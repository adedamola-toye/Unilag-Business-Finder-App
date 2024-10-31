import { configureStore } from '@reduxjs/toolkit'
import bizsReducer from "./features/bizs/bizsSlice"
import authReducer from './features/auth/authSlice'

export const store = configureStore({
  reducer: {
    bizs: bizsReducer,
    auth: authReducer,
  },
})