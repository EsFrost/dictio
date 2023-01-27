import Axios from 'axios'
import { useEffect, useState } from 'react'

const Data = ({dict, queryString}) => {

  const [getId, setGetId] = useState('')
  const [cStatus, setCStatus] = useState('')


  useEffect(() => {
    if ((getId !== '') && (cStatus !== '')) {
      if (cStatus === 'delete') {
        Axios.post('http://localhost:5174/delete', {id: getId})
      }
      /*else if (cStatus === 'edit') {
        dict.filter(item => {
          if (item.id === getId) {
            let wordInit = item.word
            let translateInit = item.translate
            let chapterInit = item.chapter

            Axios.post('http://localhost:5174/editreq', {
              id: getId,
              word: wordInit,
              translate: translateInit,
              chapter: chapterInit
            })
          }
          
        })
      }*/

      setCStatus('')
      setGetId('')
    }
  }, [getId, cStatus])


  const deleteItem = (e) => {

    setGetId(e.target.parentElement.parentElement.id)

    setCStatus('delete')
  }

  const newData = dict.filter(item => {
    if (queryString === "") {
        return item
    }
    else if ((item.word.toLocaleLowerCase().includes(queryString.toLocaleLowerCase())) || (item.translate.toLocaleLowerCase().includes(queryString.toLocaleLowerCase()))) {
        return item
    }
  }).map((item) => {
    return (
      <div key={item.id} id={item.id}>
        <span>{item.word}</span>
        <span> = </span>
        <span>{item.translate}</span>
        <span><button onClick={deleteItem}>Delete</button></span>  
        
      </div>
    )
  })

  return newData
}

export default Data