import { useState, useEffect } from 'react';
import api from '../axios';

function UserBlogs() {
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("USER");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('TOKEN');
    if (!token) {
      setMessage("User not logged in!");
      return;
    }

    try {
      const res = await api.post("/submitblog", {
        title,
        photo,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage(res.data.message);
      setTitle('');
      setPhoto('');
      setContent('');
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong while submitting.");
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '2rem auto',
        padding: '1rem',
        border: '1px solid #ddd',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Submit Your Blog</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            height: '160px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            resize: 'vertical',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit Blog
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', color: 'green', fontWeight: '600' }}>{message}</p>
      )}
    </div>
  );
}

export default UserBlogs;
