import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allBizs: [],
    displayBizs: [],
    currentBusiness: {},
    loading: false,
    error: null
}

export const bizsSlice = createSlice({
    name: 'bizs',
    initialState,
    reducers: {
        setBizs: (state, action) => {
           const data = action.payload
           state.allBizs = data
        },
        filteredBizs: (state, action) => {
            const data = action.payload
            state.displayBizs = data
         },
        fetchStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentBusiness = action.payload;
          },
          fetchFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
    }
})


export default bizsSlice.reducer;
export const {setBizs, fetchFailure,fetchStart,fetchSuccess, filteredBizs} = bizsSlice.actions;