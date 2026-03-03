
// import React, { useContext, useState, useEffect } from 'react';
//  import './virtual.css';
// import va from '../assests/ai.png';
// import { CiMicrophoneOn } from 'react-icons/ci';
// import { datacontext } from './UserContext';
// import speakimg from '../assests/speak.gif';
// import aigif from '../assests/aiVoice.gif';
// import { FaSun, FaMoon } from "react-icons/fa";
// import ChatWindow from './Chatwindow';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// function VirtualAssisstance() {
//   const { recognition, speaking, setSpeaking, prompt, response, setPrompt, setResponse } = useContext(datacontext);
//   const [theme, setTheme] = useState("light");
//   const [displayPrompt, setDisplayPrompt] = useState("");

//   useEffect(() => {
//     let index = 0;
//     if (response && prompt) {
//       const interval = setInterval(() => {
//         setDisplayPrompt(prompt.slice(0, index++));
//         if (index > prompt.length) clearInterval(interval);
//       }, 30);
//       return () => clearInterval(interval);
//     }
//   }, [prompt, response]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <div className="app-container">
//       <div className="chat-window-container">
//         <ChatWindow />
//       </div>

//       <div className={`main ${theme}`}>
//         <div className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
//           {theme === "light" ? <FaMoon /> : <FaSun />}
//         </div>

//         <div className={`avatar-container ${speaking ? "listening" : ""}`}>
//           <img src={va} alt="AI" id="shifra" />
//         </div>

//         <span className="tagline">I'm Lavina, Your Advanced Virtual Assistant</span>

//         {!speaking ? (
//           <button
//             onClick={() => {
//               setPrompt("Listening...");
//               setSpeaking(true);
//               setResponse(false);
//               recognition.start();
//             }}
//             className="mic-btn"
//           >
//             Click here <CiMicrophoneOn size={20} />
//           </button>
//         ) : (
//           <div className="response">
//             {!response ? (
//               <img src={speakimg} alt="Speaking..." id="speak" />
//             ) : (
//               <img src={aigif} alt="AI Responding..." id="aigif" />
//             )}
//             <p>{displayPrompt}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// export default VirtualAssisstance;

import React, { useContext, useState, useEffect } from 'react';
import './virtual.css';
import va from '../assests/ai.png';
import { CiMicrophoneOn } from 'react-icons/ci';
import { datacontext } from './UserContext';
import speakimg from '../assests/speak.gif';
import aigif from '../assests/aiVoice.gif';
import { FaSun, FaMoon } from "react-icons/fa";
import ChatWindow from './Chatwindow';

function VirtualAssisstance() {
  const { startRecognition, speaking, setSpeaking, prompt, response, setPrompt, setResponse } = useContext(datacontext);
  const [theme, setTheme] = useState("light");
  const [displayPrompt, setDisplayPrompt] = useState("");

  useEffect(() => {
    let index = 0;
    if (response && prompt) {
      const interval = setInterval(() => {
        setDisplayPrompt(prompt.slice(0, index++));
        if (index > prompt.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [prompt, response]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app-container">
      <div className="chat-window-container">
        <ChatWindow />
      </div>

      <div className={`main ${theme}`}>
        <div className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </div>

        <div className={`avatar-container ${speaking ? "listening" : ""}`}>
          <img src={va} alt="AI" id="shifra" />
        </div>

        <span className="tagline">I'm Lavina, Your Advanced Virtual Assistant</span>

        {!speaking ? (
          <button
            onClick={() => {
              setPrompt("Listening...");
              setSpeaking(true);
              setResponse(false);
              startRecognition();
            }}
            className="mic-btn"
          >
            Click here <CiMicrophoneOn size={20} />
          </button>
        ) : (
          <div className="response">
            {!response ? (
              <img src={speakimg} alt="Speaking..." id="speak" />
            ) : (
              <img src={aigif} alt="AI Responding..." id="aigif" />
            )}
            <p>{displayPrompt}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VirtualAssisstance;
