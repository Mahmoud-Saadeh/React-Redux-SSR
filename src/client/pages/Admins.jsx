import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAdmins } from "../slices/adminsSlice"
import useAuth from "../hooks/useAuth"

function Admins() {
    const admins = useSelector((state) => state.admins)
    const dispatch = useDispatch()
    const { user, status } = useAuth()

    useEffect(() => {
        dispatch(fetchAdmins())
    }, [])

    // if (admins.loading === "rejected") {
    //     return <div>Somthing went wrong</div>
    // }

    return (
        <div>
            {admins.loading === "fulfilled" ? (
                <ul>
                    {admins.items.map((admin) => {
                        return <li key={admin.id}>{admin.name}</li>
                    })}
                </ul>
            ) : (
                <div>Loading....</div>
            )}
        </div>
    )
}

function loadData(store) {
    return store.dispatch(fetchAdmins())
}

export default {
    element: <Admins />,
    loadData,
}
