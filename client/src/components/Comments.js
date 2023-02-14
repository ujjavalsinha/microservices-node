import React from 'react';

const Comments = props => {
    const { comments } = props;
    return (
        <div className='comments'>
            {comments.map(comment => {
                return (
                    <div style={{display: "flex"}}>
                        <p>{comment.content}</p>
                        <p>{comment.status}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments;