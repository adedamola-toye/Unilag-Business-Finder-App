import { configureStore } from '@reduxjs/toolkit'
import bizsReducer from "./features/bizs/bizsSlice"
import authReducer from './features/auth/authSlice'
import bizFormReducer from "./features/bizForm/bizFormSlice"
import modalReducer from './features/modal/modalSlice'
import blogReducer from './features/blog/blogSlice'
import userReducer from './features/users/userSlice'

export const store = configureStore({
  reducer: {
    bizs: bizsReducer,
    auth: authReducer,
    bizForm: bizFormReducer,
    modal: modalReducer,
    blog: blogReducer,
    user:userReducer
  },
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredPaths:['auth.user']
      }
    })
})