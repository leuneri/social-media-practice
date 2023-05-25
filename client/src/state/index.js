import { createSlice } from "@reduxjs/toolkit";
// createSlice takes initial state object and has reducers that change the state

const initialState = {
    // state stored in global state -> data accessible anywhere
    mode: "light",
    user: null,
    token: null,
    posts: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            // action.payload data typically comes from user input, API responses, computed values or local data stored in application
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            })
            state.posts = updatedPosts;
        }
    }

})

export const { setMode, seetLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
