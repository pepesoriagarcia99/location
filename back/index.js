
const express = require('express')
const expressWs = require('express-ws')
const bodyParser = require('body-parser')
const cors = require('cors')


const server = expressWs(express());
const { app } = server;

const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('static'))

const { User } = require('./models/User')
const trackedUsers = []
const realTimeLocation = []

app.post('/track', (req, res) => {
    console.log('<----- Tracking ----->')

    const { name } = req.body;
    const user = new User(name);
    console.log(user);

    trackedUsers.push(user)

    res.status(201).json({ id: user.id }).end();
})

app.get('/track', (req, res) => {
    res.status(200).json(trackedUsers.map(i => ({ id: i.id, name: i.name }))).end();
});

app.get('/track/:id', (req, res) => {
    const { id } = req.params;
    const user = trackedUsers.find(i => i.id === id);
    if (user) {
        res.status(200).json(user).end();
    }
    else {
        res.status(404).end();
    }
});

app.delete('/track/:id', (req, res) => {
    const { id } = req.params;
    const index = trackedUsers.findIndex(i => i.id === id);

    if (index !== -1) {
        trackedUsers.splice(index, 1);
        res.status(200).end();
    }
    else {
        res.status(404).end();
    }
});

app.get('/location/:id', (req, res) => {
    console.log('<----- Get Location ----->')

    const { id } = req.params;
    const user = trackedUsers.find(i => i.id === id);
    console.log(user);

    if (user) {
        res.status(200).json(user.locations).end();
    }
    else {
        res.status(404).end();
    }
})

app.post('/location/:id', (req, res) => {
    console.log('<----- New Location ----->')
    console.log(req.body);

    const { id } = req.params;
    const user = trackedUsers.find(i => i.id === id);

    if (user) {
        user.locations.push(req.body);

        const realTimeItem = realTimeLocation.find(e => e.id === user.id)
        if (realTimeItem) {
            realTimeItem.send(req.body);
        }

        res.status(204).end();
    }
    else {
        res.status(400).end();
    }
})

// websocket que monitorizara un usuario
// path param - id del usuario que se monitoriza
app.ws('/location/:id', (req, ws) => {
    realTimeLocation.push({
        id: req.params.id,
        send: (event) => ws.send(event)
    });

    ws.send('connect');
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})