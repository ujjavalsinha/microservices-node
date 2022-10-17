const express = require('express');
const { randomBytes } = require('crypto');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const EVENT_BUS_URL = 'http://localhost:4005';
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}
app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/posts', async (req, res) => {
    const { title } = req.body;
    const id = randomBytes(4).toString('hex');
    posts[id] = { id, title }
    const event = {
        type: 'PostCreated',
        data: { id, title}
    }
    await axios.post(`${EVENT_BUS_URL}/events`, event )
    res.status(201).send(posts[id]);
})

app.post('/events', (req, res) => {
    console.log("POST EVENT RECEIVED");
    res.send({})
})

app.listen(4000, () => {
    console.log("LISTENING AT PORT 4000")
})