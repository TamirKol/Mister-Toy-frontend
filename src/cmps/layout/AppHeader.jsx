import { NavLink } from 'react-router-dom'
import { utilService } from '../../services/util.service.js'
export function AppHeader() {

    return (
        <header className="app-header flex align-center">
            <nav className='flex align-center'>
            <img style={{ maxWidth: '120px', margin: 'auto' }} src={utilService.getAssetSrc("Mister-ToY-logo.png")}/>
                |
                <NavLink className="header-link" to="/">Home</NavLink> |
                <NavLink className="header-link" to="/about">About</NavLink> |
                <NavLink className="header-link" to="/toy">Toys</NavLink> |
                <NavLink className="header-link" to="/dashboard">DashBoard</NavLink> |
            </nav>
        </header>
    )
}

