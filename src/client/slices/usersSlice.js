import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios"

// First, create the thunk
export const fetchUsers = createAsyncThunk("users/getAll", async (_, { extra: api }) => {
    const response = await api.get("/users")
    return response.data
})

// Then, handle actions in your reducers:
const usersSlice = createSlice({
    name: "users",
    initialState: { items: [], loading: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload
            state.loading = "fulfilled"
        }),
            builder.addCase(fetchUsers.pending, (state, action) => {
                state.loading = "pending"
            }),
            builder.addCase(fetchUsers.rejected, (state, action) => {
                console.log(action)
                state.loading = "rejected"
            })
    },
})

// const {} = usersSlice.actions.
export default usersSlice.reducer
