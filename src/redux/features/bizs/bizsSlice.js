import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allBiz: [],
    displayBiz: []
}

export const businessesSlice = createSlice({
    name: 'bizs',
    initialState,
    reducers: {
        setBizs: (state, action) => {
           const data = action.payload
           state.allBiz = data
           state.displayBiz = data
        }
    }
})


export default businessesSlice.reducers;
export const {setBusinesses} = businessesSlice.actions;