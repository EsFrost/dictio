import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const ExerciseOne = () => {
    const [selectedChapter, setSelectedChapter] = useState('1')
    const [originalArray, setOriginalArray] = useState([])
    const [clicked, setClicked] = useState(0)
    const [score, setScore] = useState(0)
    const [randArray, setRandArray] = useState([])
    const mutRef = useRef(randArray)

    useEffect(() => {
        mutRef.current = randArray
        if (mutRef.current.length !== 0) console.log(mutRef.current[0].word)
    }, [randArray])

    const handleChange = (e) => {
        setSelectedChapter(val => e.target.value)
    }

    const submitValue = () => {
        setClicked(val => selectedChapter)
        Axios.get(`http://localhost:5174/exercise/${parseInt(selectedChapter)}`).then((response) => {
            setOriginalArray(val => response.data)
            setRandArray(val => response.data)
        })
        return
    }

    const beginExercise = () => {
        submitValue()
        setScore(0)
    }

    return (
        <>
        <div>
            <label>Select chapter</label>
            <input onChange={handleChange} type='number' id='chapter' defaultValue='1' min='1' />
            <button onClick={beginExercise}>Begin</button>
        </div>
        {randArray.map((item, i = 0) => {
            i++
            return (
                <div key={uuidv4()} className='dataRow'>
                    <div key={uuidv4()} className='wordCol' id={`word${i}`}>{item.word}</div>
                    <div key={uuidv4()} className='translateCol' id={`translate${i}`}>{item.translate}</div>
                </div>
            )
        })}
        {randArray.length === 0 && clicked !== 0 && 
            <div>No words found in chapter: {clicked}</div>
        }
        </>
    )
}

export default ExerciseOne;