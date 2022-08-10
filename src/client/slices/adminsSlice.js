import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios"

// First, create the thunk
export const fetchAdmins = createAsyncThunk("admins/getAll", async (_, { extra: api }) => {
    const response = await api.get("/admins")
    return response.data
})

// Then, handle actions in your reducers:
const adminsSlice = createSlice({
    name: "admins",
    initialState: { items: [], loading: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAdmins.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload
            state.loading = "fulfilled"
        }),
            builder.addCase(fetchAdmins.pending, (state, action) => {
                state.loading = "pending"
            }),
            builder.addCase(fetchAdmins.rejected, (state, action) => {
                console.log(action)
                state.loading = "rejected"
            })
    },
})

// const {} = adminsSlice.actions.
export default adminsSlice.reducer
