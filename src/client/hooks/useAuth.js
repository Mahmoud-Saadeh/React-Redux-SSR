import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { currentUser } from "../slices/currentUserSlice"
import { useNavigate } from "react-router-dom"

export default function useAuth() {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(currentUser())
    }, [dispatch])

    if (auth.loading === "fulfilled") {
        console.log("auth.user", auth.user)
        if (!auth.user) {
            navigate("/")
        }
        return {
            user: auth.user,
            status: auth.loading,
        }
    }
    if (auth.loading === "pending") {
        return {
            user: null,
            status: auth.loading,
        }
    }
    if (auth.loading === "rejected") {
        navigate("/")
        // return {
        //     user: null,
        //     status: "unauthorized",
        // }
    }
}
