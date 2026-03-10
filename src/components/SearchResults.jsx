import MovieCard from "./MovieCard"

export default function SearchResults({movie}){
    return (
        <section className="movie-section">
            <h2>Søkeresultat</h2>
            {movie?.map((mvi) => <MovieCard key={mvi.imdbID + "xd"} mvi={mvi}/>)}
        </section>
    )
}