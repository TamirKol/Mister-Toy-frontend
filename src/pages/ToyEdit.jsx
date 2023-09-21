import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()
    console.log('params:', params)

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(+params.toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issued in toy edit:', err);
                navigate('/toy')
                showErrorMsg('Toy not found!')
            })
    }

    function handleChange({ target }) {
        const value = target.value
        const field = target.name
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy added!')
                navigate('/toy')
        })
            .catch(err => {
                showErrorMsg('Cannot save toy', err)
            })
    }

    const { name, price, labels, inStock } = toyToEdit
    return (
        <section className="toy-edit">
            {params.toyId ? <h2>Edit Toy</h2> : <h2>Add Toy</h2>}

            <form onSubmit={onSaveToy}>
                <input
                    type="text"
                    placeholder="Toy name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
                <input
                    type="nymber"
                    placeholder="price"
                    name="price"
                    value={price}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="desc"
                    value={desc}
                    onChange={handleChange}
                />
                <button>Save</button>
                {/* <button onClick={onAddToy}>Add Toy</button> */}
            </form>
        </section>
    )
}