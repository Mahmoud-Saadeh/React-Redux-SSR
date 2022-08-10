import React from "react"
import { renderToPipeableStream } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server"
import Routes from "../client/Routes"
import { Writable } from "node:stream"
import { Provider } from "react-redux"
import serialize from "serialize-javascript"
import { Helmet } from "react-helmet"

// The front part of the HTML. it'll be streamed before the ReactDOMServer render result.
const frontHTML = (headAppend, preloadedState, helmet) => `
<!DOCTYPE HTML>
<html>
  <head>
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  <script>
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // https://redux.js.org/usage/server-rendering#security-considerations
    window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
  </script>
  ${headAppend}
  </head>
  <body>
    <div id="root">`

// The back part of the HTML. it'll be streamed after the ReactDOMServer render result.
const backHTML = `</div>
                </body>
              </html>`

export default async (req, res, store) => {
    res.socket.on("error", (error) => {
        console.error("Fatal", error)
    })

    // let didError = false
    let notFoundError = false
    const prom = []

    // This function handles arrays and objects
    function eachRecursive(obj) {
        if (req.path.includes(obj.props.path)) {
            if (obj.props.loadData) {
                prom.push(obj.props.loadData(store))
            }
        }
        if (obj.props.children && Array.isArray(obj.props.children)) {
            obj.props.children.forEach((element) => {
                eachRecursive(element)
            })
        } else if (obj.props.children && typeof obj.props.children === "object") {
            eachRecursive(obj.props.children)
        }
    }

    eachRecursive(Routes().props.children)

    if (req.path !== "/" && prom.length === 1) {
        notFoundError = true
    }

    const promises = prom.map((item) => {
        return new Promise((resolve, reject) => {
            item.then(resolve).catch(resolve)
        })
    })

    await Promise.all(promises)

    const preloadedState = store.getState()
    console.log(preloadedState)

    if (req.path === "/admins" && !preloadedState.auth.user) {
        return res.redirect("/")
    }

    const stream = new Writable({
        write(chunk, _encoding, cb) {
            res.write(chunk, cb)
        },
        final() {
            res.end(backHTML)
        },
    })
    const { pipe } = renderToPipeableStream(
        <Provider store={store}>
            <StaticRouter location={req.url}>
                <Routes />
            </StaticRouter>
        </Provider>,
        {
            // This script will either trigger hydration or mark hydration to be triggered after the client entry gets loaded.
            bootstrapScriptContent: `window.BOOT ? BOOT() : (window.LOADED = true)`,
            onShellReady() {
                console.log("shell ready")
                res.statusCode = notFoundError ? 404 : 200
                // Set headers for streaming
                res.setHeader("Content-Type", "text/html; charset=utf-8")
                // Write front HTML
                const helmet = Helmet.renderStatic()

                res.write(frontHTML(`<script async src="/bundle.js"></script>`, preloadedState, helmet))
                // Pipe React app render result
                pipe(stream)
            },
        }
    )
}
