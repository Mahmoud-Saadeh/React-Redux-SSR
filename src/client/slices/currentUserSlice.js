import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios"

export const currentUser = createAsyncThunk("users/getCurrent", async (_, { extra: api }) => {
    const response = await api.get("/current_user")
    return response.data
})

// Then, handle actions in your reducers:
const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: { user: {}, loading: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(currentUser.fulfilled, (state, action) => {
            // Add user to the state array
            state.user = action.payload || null
            state.loading = "fulfilled"
        }),
            builder.addCase(currentUser.pending, (state, action) => {
                state.loading = "pending"
            }),
            builder.addCase(currentUser.rejected, (state, action) => {
                console.log(action)
                state.loading = "rejected"
            })
    },
})

// const {} = usersSlice.actions.
export default currentUserSlice.reducer
