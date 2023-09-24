import { utilService } from "../../services/util.service.js"
export function ToyPreview({ toy }) {
    return (
        <article>
            <img className="toy-preview-img "src={utilService.getAssetSrc("bear.jpeg")}/>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <hr />
        </article>
    )
}