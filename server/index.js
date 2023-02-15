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

app.post('/create', (req, res) => {
    const id = req.body.id  
    const word = req.body.word
    const translate = req.body.translate
    const chapter = parseInt(req.body.chapter)
    const original = req.body.original

    if (original === '') {
        db.query('INSERT INTO dictio (id, word, translate, chapter) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE translate = \''+translate+'\', chapter = \''+chapter+'\'', [id, word, translate, chapter],
            (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send('Values inserted')
                }
        })
    }
    else {
        db.query('UPDATE dictio SET word=\''+word+'\', translate=\''+translate+'\', chapter=\''+chapter+'\' WHERE word=\''+original+'\'', (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send('Values updated')
            }
        })
    }
    
})



app.get('/editreq/:testword', (req, res) => {
    db.query('SELECT * FROM dictio WHERE word = \''+req.params.testword+'\'', (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

app.get(`/exercise/:selectedChapter`, (req, res) => {
    db.query('SELECT * FROM dictio WHERE chapter = \''+req.params.selectedChapter+'\' ORDER BY RAND() LIMIT 10', (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})


app.listen(5174, () => {
    console.log('Server is running on port 5174')
})