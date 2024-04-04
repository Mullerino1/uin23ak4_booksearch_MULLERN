import React, { useState } from 'react'
import SearchResults from "./Components/SearchResults"
import Layout from "./Components/Layout"
import './Styles/Styles.scss'

function App() {
  const [searchResultState, setSearchResultState] = useState([])

  const fetchData = async (query) => {
    try{
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`)
      const data = await response.json()
      setSearchResultState(data.docs)
    }catch (error){
      console.error("det har skjedd en feil:", error)
    }

  
  return (
   <Layout>
    <SearchResults searchResults={searchResultState} />
   </Layout>

  )
}
}

export default App
