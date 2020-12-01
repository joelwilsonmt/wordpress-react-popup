import React, { useState } from 'react'
import IframeResizer from 'iframe-resizer-react'

import Loading from "./LoadingSpinner"

const setSignedUpInLocalStorage = () => {
    localStorage.setItem("submittable_newsletter_sign_up", JSON.stringify(true))
}

const timeoutDuration = 4000


const pardotNewsletterIframe = "https://go.submittable.com/l/897841/2020-11-24/26xz"


export default ({ toggle }) => {

    const onSubmit = () => {
        setSignedUpInLocalStorage()
        setTimeout(() => { toggle(false) }, timeoutDuration);
    }


    const onMessage = data => {
        if (data.message === "success") {
            onSubmit()
        }
    }

    const [iframeReady, setReady] = useState(false)

    return [<IframeResizer
        heightCalculationMethod="lowestElement"
        onInit={() => setReady(true)}
        onMessage={onMessage}
        height={48}
        src={pardotNewsletterIframe}
        style={{ width: '1px', minWidth: '100%', display: iframeReady ? "block" : "none", minHeight: 50 }}
        frameborder="0"
        allowTransparency="true"
    />,
    !iframeReady && <Loading />
    ]
}