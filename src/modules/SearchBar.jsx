import { useState, useEffect } from "react"
import Data from "../modules/Example"
import Axios from 'axios'

const SearchBar = () => {
    
    const [dictioList, setDictioList] = useState([])
    const [query, setQuery] = useState("")
    
    const data = () => {
        Axios.get('http://localhost:5174/getdata').then((response) => {
            setDictioList(response.data)
        })
    }

    useEffect(() => {
        data()
    }, [dictioList])

    return (
        <>
            <input placeholder="Search dictionary" onChange={e => setQuery(e.target.value)} />
            <Data dict={dictioList} queryString={query} />
        </>
    )
}

export default SearchBar