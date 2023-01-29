import { useState } from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

/*
const [example, setExample] = useState([])

const handleClickEvent = (e) => {
    const el = e.target
    if (el.className === 'columnWord') {
        setExample(val => [...val, el.innerHTML])
    }
}

const checkValues = () => {
    if (example.length !== 0) {
        console.log(example)
    }
}

<div className='rowOne'>
    <div className='columnWord' id='bubbleOne' onClick={handleClickEvent}>1</div>
    <div className='columnTranslate' id='bubbleA' onClick={handleClickEvent}>2</div>
</div>

<div>
    <button onClick={checkValues}>Check values</button>
</div>
*/

const ExerciseOne = () => {
    const originalArray = [{'word': '1', 'translate': '1'}, {'word': '2', 'translate': '2'}]

    return (
        <>
        {originalArray.map((item, i = 0) => {
            i++
            return (
                <div key={uuidv4()} className='dataRow'>
                    <div key={uuidv4()} className='wordCol' id={`word${i}`}>{item.word}</div>
                    <div key={uuidv4()} className='translateCol' id={`translate${i}`}>{item.translate}</div>
                </div>
            )
        })} 
        </>
    )
}

export default ExerciseOne;