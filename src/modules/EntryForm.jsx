import { useState , useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import Axios from 'axios'

const EntryForm = () => {

    const [showEl, setShowEl] = useState(false)
    const [urlWord, setUrlWord] = useState('')
    const [orig, setOrig] = useState('')

    let inputs = {}

    const openEl = () => {
        setShowEl(true)
    }

    const closeEl = () => {
        setShowEl(false)
        inputs = {}
    }

    const checkUrl = () => {
        let w = document.getElementById('word').value
        if (w !== '') {
            setUrlWord(w)
            setOrig(urlWord)
        }
    }

    const editFn = () => {
        checkUrl()
        if (urlWord === '') {
            alert('Word field is required when editing...')
            return
        }
        Axios.get(`http://localhost:5174/editreq/${urlWord}`).then((response) => {
            //some val = (response.data)
            if (response.data.length === 0) {
                alert('The word you\'re trying to edit doesn\'t exist. Try again')
                return
            }
            else {
                let w = document.getElementById('word')
                let t = document.getElementById('translate')
                let ch = document.getElementById('chapter')
                w.value = response.data[0].word
                t.value = response.data[0].translate
                ch.value = response.data[0].chapter

                alert(`You're now editing the word ${urlWord}`)
            }
        })
        return
    }

    const submitFn = () => {

        inputs = {
            'id' : uuidv4(),
            'word': document.getElementById('word').value,
            'translate' : document.getElementById('translate').value,
            'chapter': document.getElementById('chapter').value,
            'original': orig
        }

        if ((!inputs.word || inputs.word === '') || (!inputs.translate || inputs.translate === '')) {
            alert('Something went wrong. You might have missed a field ...')
            return
        }

        Axios.post('http://localhost:5174/create', inputs)

        inputs = {}
        document.getElementById('word').value = ''
        document.getElementById('translate').value = ''
        document.getElementById('chapter').value = '1'

        return
    }

    return (
        <>
            <div>
                <button onClick={openEl}>Open editor</button>
                { showEl && (
                    <>
                        <div>
                            <label htmlFor='word'>Word: </label>
                            <input type="text" id="word" onChange={(e) => {setUrlWord(val =>e.target.value )}}/>
                        </div>
                        <div>
                            <label htmlFor='tranlsate'>Translation: </label>
                            <input type="text" id="translate"/>
                        </div>
                        <div>
                            <label htmlFor='chapter'>Chapter Number: </label>
                            <input type="number" id="chapter" defaultValue='1' min='1' />
                        </div>

                        <button onClick={editFn}>Edit</button>
                        <button onClick={submitFn}>Submit</button>
                        <button onClick={closeEl}>Close</button>
                    </>
                )}
            </div>
        </>
    )
}

export default EntryForm