const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    const { content } = data;
    if ( type === 'CommentCreated' ) {
        const status = content.includes('orange') ? 'rejected' : 'approved';
        const event = {
            type: 'CommentModerated',
            data: {
                ...data,
                status
            }
        }
        await axios.post('http://localhost:4005/events', event)
    }
    res.send({})
})

app.listen(4003, () => {
    console.log("Moderatio service listening at port 4003")
})