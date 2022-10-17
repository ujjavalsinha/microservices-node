import React, { useState } from 'react';

const CommentCreate = props => {
    const { onCommentSubmit } = props;
    const [comment, setComment] = useState('');

    const onComment = () => {
        const body = { content: comment};
        onCommentSubmit(body);
        setComment('')
    }

    return (
        <div className='CommentCreate'>
            <input value={comment} onChange={(e) => setComment(e.target.value)}></input>
            <button onClick={onComment}>Submit</button>
        </div>
    )
}

export default CommentCreate;