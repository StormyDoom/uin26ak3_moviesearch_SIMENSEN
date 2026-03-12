import { useParams } from "react-router-dom"

export default function Movie(){
    const {movie} = useParams()
    
    return (
        <main>
            <h1>{movie}</h1>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie}></img> 
            {/*Jeg får opp bare tittel når jeg trykker på link, men siden det var minimumskravet, har jeg ikke valgt å prioritere mer rundt dette.*/}
        </main>
    )
}