import { utilService } from "../../services/util.service.js"
import { useEffect, useRef, useState } from "react"

export function ToyFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

    useEffect(() => {
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, inStock, lables, pageIdx } = filterByToEdit

    return (
        <section className="toy-filter">
            <form onSubmit={onSubmitFilter}>
                <div className="filter-input-wrapper">
                    <input
                        onChange={handleChange}
                        value={txt}
                        type="text"
                        placeholder="Search"
                        name="txt"
                    />
                    <div className="fa search"></div>
                </div>
            </form>
            <select name="inStock" value={inStock} onChange={handleChange}>
                <option value="">All</option>
                <option value="true">in stock</option>
                <option value="false">out of stock</option>
            </select>

            {/* <label >
                Page:
                <input type="number"
                    name="pageIdx"
                    value={pageIdx}
                    onChange={handleChange}
                />
            </label> */}
        </section>
    )
}