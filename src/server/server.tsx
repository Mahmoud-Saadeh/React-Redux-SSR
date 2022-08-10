import express from "express"
import renderer from "../helpers/renderer"
import createStore from "../helpers/store"
import { createProxyMiddleware } from "http-proxy-middleware"

// Configuration
const API_SERVICE_URL = "http://react-ssr-api.herokuapp.com"
const PORT = process.env.PORT || 3000

const app = express()

// Proxy endpoints
app.use(
    "/api",
    createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        onProxyReq(proxyReq, req, res) {
            proxyReq.setHeader("x-forwarded-host", `localhost:3000`)
        },
        pathRewrite: {
            [`^/api`]: "",
        },
    })
)

app.use(express.static("dist"))

app.get("*", (req, res) => {
    const store = createStore(req)
    renderer(req, res, store)
})

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}...`)
}).on("error", function (error) {
    if (error.syscall !== "listen") {
        console.log("before")

        throw error
    }
    console.log("after")
    const isPipe = (portOrPipe) => Number.isNaN(portOrPipe)
    const bind = isPipe(PORT) ? "Pipe " + PORT : "Port " + PORT
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges")
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(bind + " is already in use")
            process.exit(1)
            break
        default:
            throw error
    }
})
