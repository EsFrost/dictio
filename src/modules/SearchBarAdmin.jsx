import { useState } from "react"
import Data from "../modules/ExampleAdmin"
import data from "../../dict.json"

const SearchBarAdmin = () => {
    
    const [query, setQuery] = useState("")

    return (
        <>
            <input placeholder="Search dictionary" onChange={(event => setQuery(value => event.target.value))} />
            <Data dict={data} queryString={query} />
        </>
    )
}

export default SearchBarAdmin