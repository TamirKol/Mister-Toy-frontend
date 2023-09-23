import { GoogleMap } from "../cmps/common/GoogleMap";
import { useState,useEffect } from "react";


export function About() {
const branches =[
    {name:'Tel Aviv',branchNum:1,coordinates:{ lat: 32.0853, lng: 34.7818 }},
    {name:'Haifa',branchNum:2,coordinates:{ lat: 32.79385819040188, lng:  34.98533654864868 }},
    {name:'Jerusalem',branchNum:3,coordinates:{ lat:31.774295757796867, lng:  35.2119379576297 }}
]
const [branch,setBranch]=useState(null)
useEffect(()=>{

},[branch])

function handleChange(branchCoordinates){
setBranch(branchCoordinates)
}
    return (
        <section className="about-page">
            <h2 >Welcome to MisterToy shop</h2 >
            <p>Welcome to Mister Toy, your one-stop destination for a world of digital delight and endless fun!</p>
            <p>  At Mister Toy, we've transformed the way you shop for toys,
             bringing the joy of play right to your fingertips, no matter where you are in the world..</p>

            <h3>Check out our branches</h3>
           <div>
            {branches.map((branch,)=>{return(
            <button onClick={()=>setBranch(branch.coordinates)} key={branch.branchNum}>{branch.name}</button>
            )})}
           </div>
           <div className="map-size"> 
            <GoogleMap branch={branch}/>
           </div>
        </section >
    )
}