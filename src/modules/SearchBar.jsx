import { useState } from "react"
import Data from "../modules/Example"
import data from '../../dict.json'

const SearchBar = () => {
    
    const [query, setQuery] = useState("")

    return (
        <>
            <input placeholder="Search dictionary" onChange={(event => setQuery(value => event.target.value))} />
            <Data dict={data} queryString={query} />
        </>
    )
}

export default SearchBar