import { utilService } from "../../services/util.service.js"
export function ToyPreview({ toy }) {
    return (
        <article className="toy-card">
            <img className="toy-preview-img "src={utilService.getAssetSrc("bear.jpeg")}/>
            <div><h4>{toy.name}</h4><span>{toy.inStock}</span></div>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <hr />
        </article>
    )
}