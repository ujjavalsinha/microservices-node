const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { POST_SERVICE, COMMENT_SERVICE, QUERY_SERVICE, MODERATION_SERVICE } = require('./serviceUrls');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req,res) => {
    const event = req.body;
    try{ 
        axios.post(`${POST_SERVICE}/events`, event);
        axios.post(`${COMMENT_SERVICE}/events`, event);
        axios.post(`${QUERY_SERVICE}/events`, event);
        axios.post(`${MODERATION_SERVICE}/events`, event)
    }catch(err){
        console.log("ERROR")
    }
    
    res.status(200).send("OK");
})

app.listen(4005, () => {
    console.log("Listening at port 4005")
})