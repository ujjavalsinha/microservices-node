const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto')
const axios = require('axios');
const cors = require('cors');
const EVENT_BUS_URL = 'http://localhost:4005';

const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const comments = commentsByPostId[req.params.id] || []
    return res.send(comments)
})

app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;
    const commentId = randomBytes(4).toString('hex');
    const comments = commentsByPostId[id] || [];
    comments.push({ content, id: commentId});
    const event = {
        type: 'CommentCreated',
        data: { id: commentId, content, postId: id}
    }

    await axios.post(`${EVENT_BUS_URL}/events`, event);
    commentsByPostId[id] = comments;
    return res.status(201).send(commentsByPostId);
    
})

app.post('/events', (req, res) => {
    console.log("COMMENT EVENT RECEIEVED");
    res.send({})
})

app.listen(4001, () => {
    console.log("LISTENING COMMENTS SERVICE AT PORT 4001");
})