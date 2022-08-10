import React from "react"
import { hydrateRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import Routes from "./Routes"
// import createStore from "../helpers/store"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import users from "../client/slices/usersSlice"
import currentUser from "../client/slices/currentUserSlice"
import admins from "../client/slices/adminsSlice"
import axios from "axios"

const container = document.getElementById("root")

const axiosInctance = axios.create({
    baseURL: "/api",
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

const root = hydrateRoot(
    container,
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
)
