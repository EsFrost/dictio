const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    passwore: 'password',
    host: 'localhost',
    database: 'dictionary'
})

app.get('/getdata', (req, res) => {
    db.query('SELECT * FROM dictio', (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

app.post('/delete', (req,res) => {
    const id = req.body.id

   db.query('DELETE FROM dictio WHERE id = \''+id+'\'', 
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(id + ' deleted')
        }
    })
})

/*app.post('/create', (req, res) => {
    const id = req.body.id
    const word = req.body.word
    const translation = req.body.translation
    const chapter = req.body.chapter

    db.query('INSERT INTO dictio (id, word, translation, chapter) VALUES (?, ?, ?, ?)', [id, word, translation, chapter],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send('Values inserted')
            }
        }
    )
})
*/

app.listen(5174, () => {
    console.log('Server is running on port 5174')
})