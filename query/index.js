const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};
app.get('/posts', (req, res) => {
    return res.send(posts)
})

app.post('/events', (req, res) => {
    const event = req.body;
    const { type, data} = event;
    if (type === 'PostCreated') {
        const { id, title} = data;
        posts[id] = { id, title, comments:[]}
    } else if (type === 'CommentCreated') {
        const { id, content, postId, status} = data;
        const comments = [].concat(posts[postId].comments);
        comments.push({id, content, status})
        posts[postId].comments = comments;
    } else if (type === 'CommentUpdated') {
        const { id, postId, status, content} = data;
        const comments = posts[postId].comments;
        const comment = comments.find(c => c.id === id);
        comment.status = status;
        comment.content = content;
    }
    res.status(201).send("Created")
})

app.listen(4002, () => {
    console.log("listening to port 4002")
})