import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // state stored in global state -> data accessible anywhere
    mode: "light",
    user: null,
    token: null,
    posts: []
};

export const authSlice = createSlice({
    // functions 
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    }

})