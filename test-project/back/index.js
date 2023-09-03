
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('static'))

app.post('/location', (req, res) => {
    console.log('<----- Location ----->')
    console.log(req.body);

    res.status(204).end();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})