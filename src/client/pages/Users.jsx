import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../slices/usersSlice"
import { Helmet } from "react-helmet"

function Users() {
    const users = useSelector((state) => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    if (users.loading === "rejected") {
        return <div>Somthing went wrong</div>
    }

    return (
        <div>
            <Helmet>
                <title>Users Page</title>
                <meta property="og:title" content="USERS USERS USERS)" />
                <meta property="og:description" content="Get from SEO newbie to SEO pro in 8 simple steps." />
                <meta property="og:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />
            </Helmet>
            {users.loading === "fulfilled" ? (
                <ul>
                    {users.items.map((user) => {
                        return <li key={user.id}>{user.name}</li>
                    })}
                </ul>
            ) : (
                <div>Loading....</div>
            )}
        </div>
    )
}

function loadData(store) {
    return store.dispatch(fetchUsers())
}

export default {
    element: <Users />,
    loadData,
}
