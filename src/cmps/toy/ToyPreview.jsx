
export function ToyPreview({ toy }) {
    return (
        <article>
            <img className="toy-preview-img "src="..//src//assets//img//bear.jpeg"/>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <hr />
        </article>
    )
}