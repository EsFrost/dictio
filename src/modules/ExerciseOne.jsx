import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const ExerciseOne = () => {
    const [selectedChapter, setSelectedChapter] = useState('1')
    const [clicked, setClicked] = useState(0)
    const [score, setScore] = useState(0)
    const [randArray, setRandArray] = useState([])
    const mutRef = useRef(randArray)
    const [randoArray, setRandoArray] = useState([])

    useEffect(() => {
        mutRef.current = randArray
        let temp = []
        let tempF = []
        if (mutRef.current.length !== 0) {
            temp = [...mutRef.current]
            for (let x = 0; x < mutRef.current.length; x++) {
                let i = Math.floor(Math.random() * temp.length)
                tempF[x] = temp[i].translate
                temp.splice(i, 1)
            }
            setRandoArray(tempF)
        }
    }, [randArray])


    const handleChange = (e) => {
        setSelectedChapter(val => e.target.value)
    }

    const submitValue = () => {
        setClicked(val => selectedChapter)
        Axios.get(`http://localhost:5174/exercise/${parseInt(selectedChapter)}`).then((response) => {
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
                    <div key={uuidv4()} className='translateCol' id={`translate${i}`}>{randoArray[i-1]}</div>
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