import { configureStore } from "@reduxjs/toolkit"
import users from "../client/slices/usersSlice"
import currentUser from "../client/slices/currentUserSlice"
import admins from "../client/slices/adminsSlice"
import axios from "axios"

export default (req) => {
    const axiosInctance = axios.create({
        baseURL: "https://react-ssr-api.herokuapp.com",
        headers: { cookie: req.get("cookie") || "" },
    })

    const store = configureStore({
        reducer: {
            users,
            auth: currentUser,
            admins
        },
        preloadedState: typeof window === "undefined" ? {} : window.__PRELOADED_STATE__,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: axiosInctance,
                },
            }),
    })
    // Create Redux store with state injected by the server
    // Allow the passed state to be garbage-collected
    if (typeof window !== "undefined") {
        delete window.__PRELOADED_STATE__
    }
    return store
}
