import { createSlice } from "@reduxjs/toolkit";
import { mapFirebaseUserToSerializable } from "../../../utils/firebaseUserToSerializable";
const initialState = {
  user: null,
  loading: true,
  error: null,
  userType: localStorage.getItem("userType")|| null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('User payload before mapping:', action.payload);
      const mappedUser = mapFirebaseUserToSerializable(action.payload);
      console.log('Mapped user:', mappedUser);
      state.user = mappedUser;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("userType", action.payload.userType);
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.userType = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('userType');
    },
  },
});
export const {
  setUser,
  setLoading,
  setError,
  clearError,
  setUserType,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
