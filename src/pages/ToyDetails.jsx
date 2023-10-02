import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {
    const [msg, setMsg] = useState(getEmptyMsg())
    const [review, setReview] = useState(getEmptyReview())
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }



    function getEmptyMsg() {
        return {
            txt: '',
        }
    }

    function getEmptyReview() {
        return {
            text: '',
            aboutUserId: ''
        }
    }
    function handleReviewChange(ev){
        const field = ev.target.name
        const value = ev.target.value
        setReview((review) => ({ ...review, [field]: value }))
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        const savedReview = await toyService.addMsg(toy._id, msg.txt)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: [...(prevToy.msgs || []), savedMsg],
        }))
        setMsg(getEmptyMsg())
        showSuccessMsg('Msg saved!')
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        const savedMsg = await toyService.addMsg(toy._id, msg.txt)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: [...(prevToy.msgs || []), savedMsg],
        }))
        setMsg(getEmptyMsg())
        showSuccessMsg('Msg saved!')
    }

    async function onRemoveMsg(msgId) {
        const removedMsgId = await toyService.removeMsg(toy._id, msgId)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
        }))
        showSuccessMsg('Msg removed!')
    }
    const { txt } = msg
    const {text}=review

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">

            <button><Link to="/toy">Back</Link></button>

            <div className="flex justify-center align-center justify-between">
                <div>
                    <h1>Toy: {toy.name}</h1>
                    <h5>Price: ${toy.price}</h5>
                    <p>in stock:{toy.inStock}</p>
                    <div>
                        <h4>labels:</h4>
                        {toy.labels.map((label) => {
                            return (<div key={label} className="toy-details-label">{label}</div>)
                        })}
                    </div>
                </div>
                <div><img src={utilService.getAssetSrc("bear.jpeg")} /></div>
            </div>

            <div className="flex justify-between">

                <div>
                    <h2>Reviews:</h2>
                    <form className="review-form" onSubmit={onSaveReview}>
                    <input
                            type="text"
                            name="text"
                            value={text}
                            placeholder="Add review"
                            onChange={handleReviewChange}
                            required
                            autoFocus
                        />
                        <button>Send</button>
                    </form>
                </div>

                <div>
                    <h3>add messages</h3>
                    <form className="login-form" onSubmit={onSaveMsg}>
                        <input
                            type="text"
                            name="txt"
                            value={txt}
                            placeholder="Username"
                            onChange={handleMsgChange}
                            required
                            autoFocus
                        />
                        <button>Send</button>
                    </form>
                    <div>
                        <ul>
                            {toy.msgs &&
                                toy.msgs.map((msg) => (
                                    <li key={msg.id}>
                                        By: {msg.by.fullname} - {msg.txt}
                                        <button type="button" onClick={() => onRemoveMsg(msg.id)}> X </button> 
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>

        </section>
    )
}