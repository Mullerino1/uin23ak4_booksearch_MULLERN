// import React from "react"

// const BookCard = ({book}) => {
//     const handleAmazonLink = () =>{

//         const firstValidId = book.id_amazon.find((id) => id.trim() !== "")
    
//         if (firstValidId) {
//             window.open(`https://www.amazon.com/s?k=${firstValidId}`, "_blank")
//         }
//     }

//         return (
//             <article>
//                 <div>
//                     <h3>{book.title}</h3>
//                     <p>
//                         Forfatter: {book.author_name ? book.author_name.join(", ") : "Ukjent"}
//                     </p>
//                     <p>
//                         Første publiseringsår:{" "}: {book.first_publish_year ? book.first_publish_year.join(", ") : "Ukjent"}
//                     </p>
//                     <p>
//                         Generel rating: {" "} {book.ratings_average ? book.ratings_average.join(", ") : "Ukjent"}
//                     </p>
//                 </div>

//                 <div className="imageContainer">
//                     {book.cover_i ?(
//                         <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt="Cover"
//                         />
//                     ): (
//                         <span>Ingen Cover</span>
//                     )}
//                 </div>

//                 {book.id_amazon && book.id_amazon.some((id) => id.trim() !== "")? (
//                     <button onClick={handleAmazonLink}>Gå til Amazon</button>
//                 ) : (
//                     <span>Ingen Amazon-ID funnet</span>
//                 )}
//             </article>
//         )
// }

// export default BookCard
import React, { useState, useEffect } from "react"
import SearchResults from "./SearchResults"


export default function Layout ({children})  {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResultsState, setSearchResultsState] = useState([])
  const [query, setQuery] = useState("James Bond")

  const fetchData = async (query) => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`)
      const data = await response.json()
      setSearchResultsState(data.docs)
    } catch (error) {
      console.error("Det har skjedd en feil:", error)
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
      <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Skriv minst tre tegn" />
        <button onClick={handleSearch}>Søk</button>
        </nav>
      <main>
        <SearchResults searchResults={searchResultsState} />
        {/* {children} */}
      </main>
    </>
  )
}


