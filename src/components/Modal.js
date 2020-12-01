import React from 'react'
import Form from "./Form"

const weekInMilliSeconds = 7 * 24 * 60 * 60 * 1000;
const day = weekInMilliSeconds / 7;

const modalHeader = "Hello—don't forget to join The Review!";
const modalSubheader = 'Regularly receive interesting industry and Submittable content right in your inbox.';

const localStorageSupported = () => {
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}
const hasSubscribed = () => {
    return JSON.parse(localStorage.getItem("submittable_newsletter_sign_up"))
}

const getLastSeen = () => {
    return JSON.parse(localStorage.getItem("modal") || "[]")
}

const setModalTimeSeenInLocalStorage = () => {
    localStorage.setItem("modal", JSON.stringify(new Date().getTime()))
}

const ModalInnards = ({ setHasBeenSeen, toggle, ...props }) => {
    React.useEffect(() => {
        return () => {
            console.log("setting in local storage")
            setModalTimeSeenInLocalStorage();
        }
    }, [])

    return (
        <div
            {...props}
            className={`modal-underlay ${props.className}`}
            onClick={() => {
                setHasBeenSeen(true)
                toggle(false)
            }}
        >
            <div
                className="modal-window"
                onClick={event => event.stopPropagation()}
            >
                <img
                    className="modal-close-button"
                    src="https://blog.submittable.com/wp-content/uploads/Modal-Close-Button.svg"
                    alt="Close button"
                    onClick={() => {
                        setHasBeenSeen(true)
                        toggle(false)
                    }}
                />
                <img
                    src="https://blog.submittable.com/wp-content/uploads/Airplane.svg"
                    className="modal-plane mobile-plane"
                    alt="Airplane" />
                <h2 className="modal-header">
                    {modalHeader}
                </h2>
                <img
                    src="https://blog.submittable.com/wp-content/uploads/Airplane.svg"
                    className="modal-plane large-plane"
                    alt="Airplane" />

                <div className="left-wrapper">
                    <p className="modal-sub-header">
                        {modalSubheader}
                    </p>

                    <Form toggle={toggle} />
                </div>
            </div>
        </div>
    )
}

export default (props) => {

    const shouldShowModal = () => {
        //if bottom slider is open:
        if (document.getElementsByClassName('bottom_slider_open').length > 0) {
            console.log("slider open");
            return false;
        }

        // if local storage is not supported:
        if (!localStorageSupported()) {
            console.log("local storage not supported")
            return false;
        }
        // if user has subscribed to the review already:
        if (hasSubscribed()) {
            console.log("has subscribed to newsletter")
            return false;
        }
        // if there is no entry in local storage:
        if (getLastSeen().length === 0) {
            console.log("no entry in local storage", getLastSeen())
            return true;
        }
        // if half a week or more has passed since seeing modal:
        if (getLastSeen() + day < new Date().getTime()) {
            console.log("more than a day has passed")
            return true;
        }
        // otherwise, don't show modal: 
        else {
            console.log("no reason to show modal", getLastSeen())
            return false;
        }
    }

    const [open, toggle] = React.useState(false)
    const [hasBeenSeen, setHasBeenSeen] = React.useState(false)

    const mouseOut = (e) => {
        if (!e.relatedTarget && !e.toElement) {
            toggle(true);
        }
    }

    React.useEffect(() => {
        document.body.addEventListener('mouseout', mouseOut);
        return () => {
            document.body.removeEventListener('mouseout', mouseOut);
        }
    }, [])

    /*---------------------- Modal Render -------------------------------*/
    if (open && shouldShowModal() && !hasBeenSeen) {
        // if (true) {
        return <ModalInnards {...props} setHasBeenSeen={setHasBeenSeen} toggle={toggle} />
    }
    else {
        return null;
    }
}