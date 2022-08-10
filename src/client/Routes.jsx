import React from "react"
import { Route, Routes } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Users from "./pages/Users"
import Admins from "./pages/Admins"

export default () => {
    return (
        <Routes>
            <Route {...App} path="/">
                <Route {...Home} path="/" />
                <Route {...Users} path="users" />
                <Route {...Admins} path="admins" />
                <Route {...NotFound} path="*" />
            </Route>
        </Routes>
    )
}
