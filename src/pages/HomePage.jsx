import { useSelector } from "react-redux";
import { LoginSignup } from "../cmps/common/LoginSignup.jsx"
import { utilService } from "../services/util.service.js"
export function HomePage() {

    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    console.log(user);
    return (
        <section className="home-page flex  ">

            <img className='home-page-img' src={utilService.getAssetSrc("Mister-ToY-logo.png")} />
            <div className='auth'>
                <h2 >Welcome to MisterToy shop</h2 >
              {!user &&<LoginSignup/>}  
            </div>
        </section >
    )
}