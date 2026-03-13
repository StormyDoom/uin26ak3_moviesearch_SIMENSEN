import { useEffect, useState } from "react"
import History from "../components/History"
import SearchResults from "../components/SearchResults"

export default function Home({mvi}){
    const [movie, setMovie] = useState([])
    const [search, setSearch] = useState("James-Bond")
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
            setMovie(data.Search)
            console.log(data)
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getMovies()
    },[])

    const handleChange = (e)=> {
        const value = e.target.value 
        setSearch(value)

        {/*Funksjon som gjør at man må bruke 3 tegn for å få et søk er hentet fra CoPilot https://copilot.microsoft.com/chats/xkhq1pYNQ6UjnskJDp1rf */}
        {/*Før denne funksjonen, så måtte man fremdeles bruke 3 tegn før man fikk opp resultater*/}
        if (value.length >= 3) { 
            getMovies(value)         
        } else {
            setMovie([])
        }
    }

    console.log(search)

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (search.length < 3) return
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
                <button onClick={getMovies}>Søk</button>
            <SearchResults movie={movie}/>
        </main>
    )
}