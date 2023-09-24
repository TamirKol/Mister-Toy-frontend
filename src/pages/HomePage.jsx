import { utilService } from "../services/util.service.js"

export function HomePage() {

    return (
        <section className="home-page">
            {/* <h2 >Welcome to MisterToy shop</h2 > */}
                <img src={utilService.getAssetSrc("home-page.jpg")}/>
        </section >
    )
}