export default function MovieCard({mvi}){
    const {Title, Poster, Year} = mvi
    return (
        <article className="movie-cards">
            <h3>{Title}</h3>
            <p>{Year}</p>
            <img src={Poster} alt={Title}></img>
        </article>
    )
}