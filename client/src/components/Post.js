import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import Comments from './Comments';
import { getComments, postComments } from '../services/CommentService';

const Post = props => {
    const { post } = props;
    const { id, title, comments } = post;

    const onCommentSubmit = (body) => {
        postComments(id, body)
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