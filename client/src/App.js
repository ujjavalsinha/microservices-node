import React, { useState, useEffect } from 'react';
import PostCreate from './components/PostCreate';
import Posts from './components/Posts'
import { getPosts, createPost } from './services/PostService';
import './App.css';

function App() {
  const [posts, setPosts] = useState({})
  const fetchPosts = () => {
    getPosts()
    .then(res => {
      setPosts(res.data)
    })
  }
  useEffect(() => {
    fetchPosts()
  },[])

  const onPostSubmit = (body) => {
    createPost(body)
    .then(res => {
      fetchPosts();
    })
  }

  return (
    <div className='App'>
      <PostCreate onSubmit={onPostSubmit}/>
      <Posts posts={posts}/>
    </div>
  );
}

export default App;
