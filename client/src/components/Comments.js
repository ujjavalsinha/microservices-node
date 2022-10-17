import React from 'react';

const Comments = props => {
    const { comments } = props;
    return (
        <div className='comments'>
            {comments.map(comment => {
                return (
                    <p>{comment.content}</p>
                )
            })}
        </div>
    )
}

export default Comments;