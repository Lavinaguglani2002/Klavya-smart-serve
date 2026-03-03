// import React, { createContext, useState } from 'react';
// import { run } from "./gemini"

// export const datacontext = createContext();

// function UserContext(props) {
//   const [speaking, setSpeaking] = useState(false);
//   const [prompt, setPrompt] = useState('Listening...');
//   const [response, setResponse] = useState(false);

//   function speak(text) {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.volume = 1;
//     utterance.rate = 1;
//     utterance.pitch = 1;
//     utterance.lang = 'hi-IN';
//     window.speechSynthesis.speak(utterance);
//   }

//   async function aiResponse(prompt) {
//     try {
//       const text = await run(prompt);
//       const newText = text.replace(/\*\*/g, '').replace(/\*/g, '');
//       setPrompt(newText);
//       speak(newText);
//       setResponse(true);
//     } catch {
//       setPrompt("Error getting response");
//       speak("Sorry, I couldn't understand that.");
//     } finally {
//       setTimeout(() => setSpeaking(false), 5000);
//     }
//   }

//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   let recognition = null;

//   if (SpeechRecognition) {
//     recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = 'en-US';

//     recognition.onresult = (e) => {
//       const transcript = e.results[0][0]?.transcript?.trim();
//       if (transcript) {
//         setPrompt(transcript);
//         takeCommand(transcript.toLowerCase());
//       }
//     };
//   }

//   function takeCommand(command) {
//     if (command.includes("time")) {
//       const time = new Date().toLocaleTimeString();
//       speak(time);
//       setPrompt(time);
//     } else if (command.includes("date")) {
//       const date = new Date().toLocaleDateString();
//       speak(date);
//       setPrompt(date);
//     } else {
//       aiResponse(command);
//     }
//     setResponse(true);
//     setTimeout(() => setSpeaking(false), 5000);
//   }

//   const value = {
//     recognition,
//     speaking,
//     setSpeaking,
//     prompt,
//     setPrompt,
//     response,
//     setResponse,
//   };

//   return React.createElement(datacontext.Provider, { value }, props.children);
// }

// export default UserContext;

import React, { createContext, useState, useRef, useEffect } from 'react';
import { run } from "./gemini";

export const datacontext = createContext();

function UserContext(props) {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState('Listening...');
  const [response, setResponse] = useState(false);
  const recognitionRef = useRef(null);

  function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'hi-IN';
    window.speechSynthesis.speak(u);
  }

  async function aiResponse(p) {
    try {
      const text = await run(p);
      const newText = text.replace(/\*\*/g, '').replace(/\*/g, '');
      setPrompt(newText);
      speak(newText);
      setResponse(true);
    } catch (err) {
      setPrompt("Error getting response");
      speak("Sorry, I couldn't understand that.");
    } finally {
      setTimeout(() => setSpeaking(false), 5000);
    }
  }

  function takeCommand(command) {
    if (!command) return;
    if (command.includes("time")) {
      const time = new Date().toLocaleTimeString();
      speak(time);
      setPrompt(time);
    } else if (command.includes("date")) {
      const date = new Date().toLocaleDateString();
      speak(date);
      setPrompt(date);
    } else {
      aiResponse(command);
    }
    setResponse(true);
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      recognitionRef.current = null;
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = 'en-US';

    recog.onstart = () => setSpeaking(true);
    recog.onend = () => setSpeaking(false);
    recog.onerror = (e) => {
      console.error("Recog error:", e);
      setSpeaking(false);
    };

    recog.onresult = (e) => {
      const transcript = e.results?.[0]?.[0]?.transcript?.trim();
      if (transcript) {
        setPrompt(transcript);
        takeCommand(transcript.toLowerCase());
      }
    };

    recognitionRef.current = recog;

    return () => {
      recognitionRef.current = null;
    };
  }, []);

  function startRecognition() {
    const r = recognitionRef.current;
    if (r && typeof r.start === 'function') {
      try { r.start(); } catch (e) { console.warn("start failed:", e); }
    } else {
      alert("Speech recognition not available in this browser.");
    }
  }

  function stopRecognition() {
    const r = recognitionRef.current;
    if (r && typeof r.stop === 'function') {
      try { r.stop(); } catch (e) { console.warn("stop failed:", e); }
    }
  }

  function processTranscript(manualText) {
    if (!manualText) return;
    setPrompt(manualText);
    takeCommand(manualText.toLowerCase());
  }

  const value = {
    startRecognition,
    stopRecognition,
    processTranscript,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
  };

  return (
    <datacontext.Provider value={value}>
      {props.children}
    </datacontext.Provider>
  );
}

export default UserContext;
