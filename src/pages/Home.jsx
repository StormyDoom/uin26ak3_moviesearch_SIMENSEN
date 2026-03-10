import { useEffect, useState } from "react"
import History from "../components/History"
import MovieCard from "../components/MovieCard"
import SearchResults from "../components/SearchResults"

export default function Home({mvi}){
    const [movie, setMovie] = useState([])
    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false)
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

    console.log("Denne kommer fra storage", storedHistory)

    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(()=>{
        localStorage.setItem("search", JSON.stringify(history))
    },[history])

    const getMovies = async()=> {
        try
        {
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            console.log(data)
            setMovie(data.Search)
        }
        catch(err){
            console.error(err);
        }
    }

    const handleChange = (e)=> {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        e.target.reset()

        setHistory((prev) => [...prev, search])
        
    }
    console.log(history)
    console.log("Denne kommer fra mvi", mvi)
    
    return (
        <main>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film
                    <input type="search" placeholder="Ratatouille" onChange={handleChange} onFocus={()=> setFocused(true)} /*onBlur={()=> setFocused(false)}*/></input>
                </label>
                {focused ? <History history={history} setSearch={setSearch}/> : null}
            </form>
            <SearchResults movie={movie}/>
                <button onClick={getMovies}>Søk</button>
        </main>
    )
}