import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
            <nav>
                |
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
            </nav>
            <h1>Mister Toy</h1>
        </header>
    )
}

