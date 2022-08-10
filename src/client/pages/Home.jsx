import * as React from "react"
import { Helmet } from "react-helmet"

function Home() {
    const [times, setTimes] = React.useState(0)
    return (
        <div>
            <Helmet>
                <title>Home Page</title>
                <meta property="og:title" content="How to Become an SEO Expert (8 Steps)" />
                <meta property="og:description" content="Get from SEO newbie to SEO pro in 8 simple steps." />
                <meta property="og:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />
            </Helmet>
            <h1>Hello {times}</h1>
            <button onClick={() => setTimes((times) => times + 1)}>ADD</button>
        </div>
    )
}

export default {
    element: <Home />,
}
