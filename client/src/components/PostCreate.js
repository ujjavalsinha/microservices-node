import React, { useState } from 'react';

const PostCreate = (props) => {
    const { onSubmit } = props;
    const [postInput, setPostInput] = useState('')

    const onPostSubmit = () => {
        console.log("SUBMITTIN POST")
        onSubmit({ title: postInput })
        setPostInput('');
    }
    
    return (
        <div className='PostCreate'>
            <div className='post-input'>
                <label>Title</label>
                <input 
                    value={postInput} 
                    onChange={(e) => setPostInput(e.target.value)}
                />
            </div>
            <button style={{display: 'block'}}onClick={onPostSubmit}>Submit</button>
        </div>
    )
}

export default PostCreate