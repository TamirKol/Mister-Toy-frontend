import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

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
    console.log(toyId)
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy: {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>in stock:{toy.inStock}</p>

            <Link to="/toy">Back</Link>
        </section>
    )
}