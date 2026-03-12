import { Link } from "react-router-dom"

export default function MovieCard({mvi}){
const {Title, Poster, Year} = mvi
    return (
        <article className="movie-cards">
            <h3>{Title}</h3>
            <p>{Year}</p>
            <img src={Poster} alt={Title}></img>
            <Link to={Title} onClick={()=> setApiEndpoint()}>Les mer om {Title}</Link> {/*Jobbet med Fride Standal*/}
        </article>
    )
}