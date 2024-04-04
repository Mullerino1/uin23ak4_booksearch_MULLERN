import React from 'react'
import BookCard from "./BookCard"

const SearchResults = ({searchResults}) => {
    return(
        <div>
            {searchResults.map((result, index) =>(
                <div key={index}>
                    <BookCard book={result} />
                    </div>
            ))}
        </div>
    )
}
export default SearchResults