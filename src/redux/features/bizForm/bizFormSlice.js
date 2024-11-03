import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: "",
    category: "",
    address: "",
    tel: "",
    email: "",
    description: "",
    imgUrl: ""
}

export const bizFormSlice = createSlice({
    name: 'bizForm',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
          },
          resetForm: (state) => {
            state.name = "";
            state.address = ""
            state.category = "";
            state.tel = "",
            state.email = ""
            state.description = "";
            state.imgUrl = "";
          },
    }
})

export const { updateField, resetForm } = bizFormSlice.actions;
export default bizFormSlice.reducer;