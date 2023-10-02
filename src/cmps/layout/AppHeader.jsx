import { NavLink, useNavigate } from 'react-router-dom'
import { utilService } from '../../services/util.service.js'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { logout } from '../../store/actions/user.actions.js'
export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const navigate=useNavigate()
    async function onLogout() {
        try {
          await logout()
          showSuccessMsg('Logout successfully')
          navigate('/')
        } catch (err) {
          console.log('err:', err)
          showErrorMsg('Cannot logout')
        }
      }
    return (
        <header className="app-header flex align-center">
            <nav className='flex align-center'>
                <img style={{ maxWidth: '120px', margin: 'auto' }} src={utilService.getAssetSrc("Mister-ToY-logo.png")} />
                {user && <div className='flex'>
                    <NavLink className="header-link" to="/">Home</NavLink> |
                    <NavLink className="header-link" to="/about">About</NavLink> |
                    <NavLink className="header-link" to="/toy">Toys</NavLink> |
                    <NavLink className="header-link" to="/dashboard">DashBoard</NavLink> |
                    <div className=' flex '>
                    <p className='profile'>😀</p><span>{user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                    </div>
                </div>}
            </nav>
        </header>
    )
}

