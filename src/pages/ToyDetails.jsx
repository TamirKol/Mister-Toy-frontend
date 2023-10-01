import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {
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
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <button><Link to="/toy">Back</Link></button>
            <div className="flex justify-center align-center">
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
                <h2>Reviews:</h2>
                <button>add messages</button>
            </div>
        </section>
    )
}