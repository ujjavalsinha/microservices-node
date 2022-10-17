import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import Comments from './Comments';
import { getComments, postComments } from '../services/CommentService';

const Post = props => {
    const { post } = props;
    const [comments, setComments] = useState([])
    const { id, title } = post;
    const fetchComments = () => {
        getComments(id)
        .then(res => setComments(res.data))
    }

    useEffect(() => {
        fetchComments()
    }, [id])

    const onCommentSubmit = (body) => {
        postComments(id, body)
        .then(res => fetchComments())
    }

    return (
        <div className='post'>
            <h1>{title}</h1>
            <CommentCreate onCommentSubmit={onCommentSubmit}/>
            <Comments comments={comments}/>
        </div>
    )
}

export default Post;