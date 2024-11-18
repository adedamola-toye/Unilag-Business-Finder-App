import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allPosts: [],
    name: "",
    userType: "",
    contentTitle: "",
    content: "",
    noOfLikes: 0,
}

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            const data = action.payload
            state.allPosts = data
         },
        updatePostField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
          },
          resetPostForm: (state) => {
            state.name = "";
            state.userType = ""
            state.contentTitle = "";
            state.content= "";
          },
          incrementLikes: (state) => {
            state.noOfLikes += 1
          }
    }
})

export default blogSlice.reducer;
export const {updatePostField, resetPostForm, incrementLikes, setPosts} = blogSlice.actions;



