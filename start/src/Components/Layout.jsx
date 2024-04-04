import React, { useState, useEffect } from "react"
import SearchResults from "./SearchResults"

export default function Layout ({children}){
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResultsState, setSearchResultsState] = useState([])
    const [query, setQuery] = useState("James Bond")


    // query ble inspirert av det som ble gjort til timen under rick and morty oppgavene https://github.com/toremake/UIN2024_coursebase/blob/main/Category_blogg/src/App.jsx
    const fetchData = async (query) => {
        try{
            const response = await fetch(`https://openlibrary.org/search.json?title=${query}`)
            const data = await response.json()
            setSearchResultsState(data.docs)
        } catch (error){
            console.error("Det har skjedd en feil", error)
        }
    }

    useEffect(() => {
        if (query) {
            fetchData(query)
        }
    }, [query])

    const handleSearch = () => {
        if (searchTerm.length >= 3) {
            setQuery(searchTerm)
            // gjør sånn at det må være mer enn 3 tegn/bokstaver i feltet før den søker
        }
    }
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
        <header>
            <h1>Book Search</h1>
        </header>
        <nav>
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Skriv minst tre tegn"/>
            <button onClick={handleSearch}>Søk</button>
        </nav>
        <main>
            <SearchResults searchResults={searchResultsState} />
            {children}
        </main>
        </>
    )
}