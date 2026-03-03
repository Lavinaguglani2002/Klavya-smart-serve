// // import React, { useContext, useRef, useEffect, useState } from 'react';
// // import { datacontext } from './UserContext';
// // import jsPDF from 'jspdf';

// // export default function ChatWindow() {
// //   const { prompt, response, recognition, speaking } = useContext(datacontext);
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const endRef = useRef(null);

// //   useEffect(() => {
// //     if (response) setMessages((prev) => [...prev, { text: prompt, from: 'ai' }]);
// //   }, [response, prompt]);

// //   const handleSend = () => {
// //     if (input.trim()) {
// //       setMessages((prev) => [...prev, { text: input, from: 'user' }]);
// //       recognition.stop();
// //       recognition.onresult({ results: [[{ transcript: input }]] });
// //       setInput('');
// //     }
// //   };

// //   const downloadPDF = () => {
// //     const doc = new jsPDF();
// //     let y = 10;
// //     messages.forEach((msg) => {
// //       const sender = msg.from === 'user' ? 'You' : 'AI';
// //       const lines = doc.splitTextToSize(`${sender}: ${msg.text}`, 180);
// //       doc.text(lines, 10, y);
// //       y += lines.length * 10;
// //       if (y > 270) {
// //         doc.addPage();
// //         y = 10;
// //       }
// //     });
// //     doc.save('chat.pdf');
// //   };

// //   useEffect(() => {
// //     if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   return React.createElement(
// //     'div',
// //     { style: { background: 'linear-gradient(to bottom, #77a1d3, #79cbca, #e684ae)', height: '100vh', display: 'flex', flexDirection: 'column' } },
// //     React.createElement('div', { style: { backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '10px' } }, 'AI Assistant 🤖'),
// //     React.createElement(
// //       'div',
// //       { style: { flex: 1, overflowY: 'auto', padding: '10px' } },
// //       messages.map((m, i) =>
// //         React.createElement('div', { key: i, style: { background: m.from === 'user' ? '#d1ffd1' : '#f1f1f1', margin: '5px', padding: '8px', borderRadius: '5px' } }, m.text)
// //       ),
// //       React.createElement('div', { ref: endRef })
// //     ),
// //     React.createElement('button', { onClick: downloadPDF, style: { margin: '5px', padding: '8px' } }, '📥 Download Chat as PDF'),
// //     React.createElement(
// //       'div',
// //       { style: { display: 'flex', gap: '5px', padding: '10px', background: 'white' } },
// //       React.createElement('button', { onClick: () => !speaking && recognition.start() }, '🎤'),
// //       React.createElement('input', {
// //         value: input,
// //         onChange: (e) => setInput(e.target.value),
// //         onKeyDown: (e) => e.key === 'Enter' && handleSend(),
// //         style: { flex: 1 }
// //       }),
// //       React.createElement('button', { onClick: handleSend }, 'Send')
// //     )
// //   );
// // }

// import React, { useContext, useRef, useEffect, useState } from 'react';
// import { datacontext } from './UserContext';
// import jsPDF from 'jspdf';

// export default function ChatWindow() {
//   const { prompt, response, speaking, processTranscript, stopRecognition, startRecognition } = useContext(datacontext);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const endRef = useRef(null);

//   useEffect(() => {
//     if (response) setMessages((prev) => [...prev, { text: prompt, from: 'ai' }]);
//   }, [response, prompt]);

//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages((prev) => [...prev, { text: input, from: 'user' }]);
//       stopRecognition();
//       processTranscript(input);
//       setInput('');
//     }
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     let y = 10;
//     messages.forEach((msg) => {
//       const sender = msg.from === 'user' ? 'You' : 'AI';
//       const lines = doc.splitTextToSize(`${sender}: ${msg.text}`, 180);
//       doc.text(lines, 10, y);
//       y += lines.length * 10;
//       if (y > 270) {
//         doc.addPage();
//         y = 10;
//       }
//     });
//     doc.save('chat.pdf');
//   };

//   useEffect(() => {
//     if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div style={{ background: 'linear-gradient(to bottom, #77a1d3, #79cbca, #e684ae)', height: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <div style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '10px' }}>AI Assistant 🤖</div>
//       <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
//         {messages.map((m, i) =>
//           <div key={i} style={{ background: m.from === 'user' ? '#d1ffd1' : '#f1f1f1', margin: '5px', padding: '8px', borderRadius: '5px' }}>{m.text}</div>
//         )}
//         <div ref={endRef} />
//       </div>
//       <button onClick={downloadPDF} style={{ margin: '5px', padding: '8px' }}>📥 Download Chat as PDF</button>
//       <div style={{ display: 'flex', gap: '5px', padding: '10px', background: 'white' }}>
//         <button onClick={() => !speaking && startRecognition()}>🎤</button>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           style={{ flex: 1 }}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// }
