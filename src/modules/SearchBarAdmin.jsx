import { useState,useEffect } from "react"
import Data from "../modules/ExampleAdmin"
import EntryForm from '../modules/EntryForm'
import Axios from 'axios'

const SearchBarAdmin = () => {
    
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
            <EntryForm />
            <input placeholder="Search dictionary" onChange={(event => setQuery(value => event.target.value))} />
            <Data dict={dictioList} queryString={query} />
        </>
    )
}

export default SearchBarAdmin