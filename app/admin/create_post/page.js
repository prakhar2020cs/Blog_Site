// app/page.js
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  const createPost = async () => {
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
    fetchPosts();
    setTitle('');
    setContent('');
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Create Post</h1>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={createPost}>Submit</button>

      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <strong>{post.title}</strong>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
