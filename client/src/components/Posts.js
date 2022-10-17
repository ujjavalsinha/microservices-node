import React from 'react';
import Post from './Post';

const Posts = props => {
    const { posts } = props;
    return (
        <div className='posts'>
            {Object.entries(posts).map(([id,post]) => {
                return (
                    <Post post={post}/>
                )
            })}
        </div>
    )
}

export default Posts;