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
    comments.push({ content, id: commentId, status: 'pending'});
    const event = {
        type: 'CommentCreated',
        data: { id: commentId, content, postId: id, status: 'pending'}
    }

    await axios.post(`${EVENT_BUS_URL}/events`, event);
    commentsByPostId[id] = comments;
    return res.status(201).send(commentsByPostId);
    
})

app.post('/events', async (req, res) => {
    console.log("COMMENT EVENT RECEIEVED");
    const event = req.body;
    if (event.type === 'CommentModerated') {
        const { id, postId, status, content } = event.data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(c => c.id === id);
        comment.status = status
        const updateEvent = {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                content,
                status
            }
        }
        await axios.post(`${EVENT_BUS_URL}/events`, updateEvent)
    }
    res.send({})
})

app.listen(4001, () => {
    console.log("LISTENING COMMENTS SERVICE AT PORT 4001");
})