import React from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { currentUser } from "./slices/currentUserSlice"

function App() {
    const auth = useSelector((state: { auth: any }) => state.auth)
    const authButton = auth?.user?.googleId ? <a href="/api/logout">Logout</a> : <a href="/api/auth/google">Login</a>

    return (
        <div>
            <h3>This is a header</h3>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/admins">Admins</Link>
            {authButton}
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default {
    element: <App />,
    loadData: (store) => store.dispatch(currentUser()),
}
