import { toyService } from "../../services/toy.service.js"
import { utilService } from "../../services/util.service.js"
import { useEffect, useRef, useState } from "react"
import { MultiSelect } from "../common/MultiSelect.jsx"
export function ToyFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const toyLabels = toyService.getToyLabels()

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
            {/* <div className="filter-input-wrapper">
            <label htmlFor="toys">Labels:</label>
                    <select multiple value={lables} name="labels" id="labels" onChange={handleChange}>
                        <option value="">All</option>
                        <>
                            {toyLabels.map(label => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </>

                    </select>
                    
            </div> */}
        <MultiSelect 
           names={toyLabels}
           handleFilterChange={handleChange}
        />

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