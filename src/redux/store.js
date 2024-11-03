import { configureStore } from '@reduxjs/toolkit'
import bizsReducer from "./features/bizs/bizsSlice"
import authReducer from './features/auth/authSlice'
import bizFormReducer from "./features/bizForm/bizFormSlice"

export const store = configureStore({
  reducer: {
    bizs: bizsReducer,
    auth: authReducer,
    bizForm: bizFormReducer
  },
})