import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const ExerciseOne = () => {
    const [selectedChapter, setSelectedChapter] = useState('1') // chatper selection variable
    const [clicked, setClicked] = useState(0) // flag for game init
    const [score, setScore] = useState(0) // exercise score
    const [total, setTotal] = useState(0) // total score
    const [randArray, setRandArray] = useState([]) // the initial array randomized
    const mutRef = useRef(randArray) // ref to the initial array
    const [randoArray, setRandoArray] = useState([]) // rando of init array
    const [randoArrayTwo, setRandoArrayTwo] = useState([]) // rando of init array for exercise two
    const [exercise, setExercise] = useState([]) // required for exercise one
    const [tempWord, setTempWord] = useState('') // flag for ex 1
    const [currentEx, setCurrentEx] = useState(1) // flag for exercises
    const [checked, setChecked] = useState(0) // flag for buttons
    const [tempArr, setTempArr] = useState([]) // flag for ex 2
    const tempRef = useRef(tempArr) // ref of flag for ex 2

    // ===================== init =====================

    useEffect(() => {
        mutRef.current = randArray
        tempRef.current = tempArr
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
    }, [randArray, tempArr])

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
        setTotal(0)
        setCurrentEx(1)
        setExercise([])
        setTempArr([])
        setChecked(0)
    }

    // =========== required functions ==============

    const nextExercise = () => {
        setRandoArrayTwo([])
        if (clicked !== 0) {
            let temp = [...randArray]
            let tempF = []
            for (let x = 0; x < randArray.length; x++) {
                let i = Math.floor(Math.random() * temp.length)
                if (currentEx === 1) tempF[x] = [temp[i].word, x]
                else if (currentEx === 2) tempF[x] = [temp[i].translate, x]
                temp.splice(i, 1)
            }
            setRandoArrayTwo(tempF)
            if (currentEx === 2) calculateRes() // calculates score if next was clicked by accident
            setCurrentEx(currentEx + 1)
            setScore(0)
            setChecked(0)
        }
    }


    const mapSearch = (arr, theWord, theTranslation) => {
        arr.map(item => {
            if (item.word === theWord && item.translate === theTranslation) {
                setScore(score => score + 4)
                setTotal(total => total + 4)
            }
        })
    }

    // ================ ex 1 functionality =========

    const matchFunc = (e) => {
        let uid = e.target.getAttribute('unique-id')
        let val = e.target.innerHTML
        if (exercise.length !== 0 && tempWord !== '') {
            let found = 0
            exercise.map(item => {
                if (item[0] === tempWord || item[2] === uid) {
                    found = 1
                }
            })
            if (found === 0) {
                setExercise([...exercise, [tempWord, val, uid]])
                mapSearch(randArray, tempWord, val)
            }
            else return
        }
        else if (exercise.length === 0 && tempWord !== '') {
            setExercise([...exercise, [tempWord, val, uid]])
            mapSearch(randArray, tempWord, val)
        }
    }

    // ================= ex 2 functionality ==============

    const calculateRes = () => {
        let found = 0
        if (checked === 1) {
            return
        }
        setChecked(1)
        let compareArr = []
        for (let x = 0; x < 5; x++) { // 5 is the number of checks, it should change to 10 or better dynamically
            if (currentEx === 2) {  
                if (document.getElementById(`word-${x}`).value === undefined) document.getElementById(`word-${x}`).value = ''
                compareArr = ([...compareArr, [document.getElementById(`word-${x}`).getAttribute('wordattr').toLowerCase(), document.getElementById(`word-${x}`).value.toLowerCase(), x]])
            }
            else if (currentEx === 3) {
                if (document.getElementById(`translate-${x}`).value === undefined) document.getElementById(`translate-${x}`).value = ''
                compareArr = ([...compareArr, [document.getElementById(`translate-${x}`).getAttribute('translateattr').toLocaleLowerCase(), document.getElementById(`translate-${x}`).value.toLowerCase(), x]])
            }
        }
        setTempArr([...compareArr])

        if (currentEx === 2) {
            randArray.map(rItem =>{
                compareArr.map(tItem => {
                    if ((rItem.word === tItem[0]) && (rItem.translate === tItem[1])) {
                        found = 1
                        setScore(score => score + 8)
                        setTotal(total => total + 8)
                    }
                })
                if (found === 0 && currentEx === 2) {
                    console.log(document.getElementById(`exTwo-${rItem.word}`)) // do something with the items that were wrong
                }
                else {
                    found = 0
                }
            })
        }
        else if (currentEx === 3) {
            compareArr.map((rItem) => {
                randArray.map(tItem => {
                    if ((tItem.translate === rItem[0]) && (tItem.word === rItem[1])) {
                        found = 1
                        setScore(score => score + 8)
                        setTotal(total => total + 8)
                    }
                })
                if (found === 0) {
                    console.log(document.getElementById(`translate-${rItem[2]}`))
                }
                else {
                    found = 0
                }
            })
        }
        
    }

    const populateInputs = () => {
        for (let x = 0; x < tempRef.current.length; x++) {  
            if (currentEx === 2) document.getElementById(`word-${x}`).value = tempRef.current[x][1]
            else if (currentEx === 3) document.getElementById(`translate-${x}`).value = tempRef.current[x][1]
        }
    }

    const checkBtn = () => {
        calculateRes()
        const timeout = setTimeout(() => {populateInputs()}, 1)
        return () => {clearTimeout(timeout)}
    }

    // ============ render ================

    return (
        <>
        <div>
            <label>Select chapter</label>
            <input onChange={handleChange} type='number' id='chapter' defaultValue='1' min='1' />
            <button onClick={beginExercise}>Begin</button>
        </div>
        {currentEx === 1 && randArray.map((item, i = 0) => {
            i++
            return (
                <div key={uuidv4()} className='dataRow'>
                    <div className='wordCol' id={`word${i}`} onClick={(e) => setTempWord(e.target.innerHTML)}>{item.word}</div>   
                    <div className='translateCol' id={`translate${i}`} onClick={matchFunc} unique-id={i}>{randoArray[i-1]}</div>
                </div>
                )
            })}
            {randArray.length === 0 && clicked !== 0 && 
                <div>No words found in chapter: {clicked}</div>
            }
            
            {currentEx === 2 && clicked !== 0 && randoArrayTwo.map(item => {
                return <div key={uuidv4()} id={`exTwo-${item[0]}`}>
                            <span>{item[0]}</span>
                            <span><input wordattr={item[0]} posattr={item[1]} type='text' id={`word-${item[1]}`}></input></span>
                        </div>
            })}

            {currentEx === 3 && clicked !== 0 && randoArrayTwo.map(item => {
                return <div key={uuidv4()} id={`exThree-${item[1]}`}>
                    <span>{item[0]}</span>
                    <span><input translateattr={item[0]} posattr={item[1]} type='text' id={`translate-${item[1]}`} /></span>
                </div>
            })}

            {currentEx === 1 && <>  
                    <div><button onClick={nextExercise}>Next</button></div>
                    <div>Score: {score}/20, Total score: {total}/100</div>
                </>
            }
            {currentEx == 2 && <>
                    <div>
                        <button onClick={checkBtn}>Check answers</button>
                        <button onClick={nextExercise}>Next</button>
                    </div>
                    <div>Score: {score}/40, Total score: {total}/100</div>
                </>
            }
            {
                currentEx == 3 && <>
                    <div>
                        <button onClick={checkBtn}>Check answers</button>
                    </div>
                    <div>Score: {score}/40, Total score: {total}/100</div>
                </>
            }
            </>
        )
}

export default ExerciseOne;