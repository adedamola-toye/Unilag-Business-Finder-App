import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: true,
    error: null,
    userType: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser: (state, action) =>{
            state.user=action.payload;
            state.userType = action.payload.userType;
            state.isAuthenticated = true;
            state.loading = false;
        },
        setLoading: (state, action)=>{
            state.loading = action.payload;
        },
        setError : (state, action) =>{
            state.error = action.payload;
        },
        clearError: (state)=>{
            state.error = null;
        },
        setUserType: (state, action)=>{
            state.userType = action.payload
        },
        logoutUser: (state) => {
            state.user = null;
            state.userType = null;
            state.isAuthenticated = false
            state.loading=false
        }
    }
})
export const { setUser, setLoading, setError, clearError, setUserType, logoutUser } = authSlice.actions;

export default authSlice.reducer;
