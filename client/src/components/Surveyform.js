import React from 'react';

const Surveyform = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Feedback Matters</h2>
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScN22UnGHDyK-hUgm8HnwZlsd1SwGzk7jyw-XEb5LX0K30TRQ/viewform?embedded=true" width="640" height="1839" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

  </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333',
  },
  iframe: {
    border: 'none',
    borderRadius: '8px',
  },
};

export default Surveyform;
