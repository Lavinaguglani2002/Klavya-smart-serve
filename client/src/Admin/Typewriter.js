import React, { useState, useEffect } from 'react';

const Typewriter = ({ texts, delay, switchDelay, onUpdate }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0); // Tracks which text is being typed
  //📌 currentText → Yeh currently typed text store karega.
//📌 currentIndex → Yeh currently typed character ka index track karega.
//📌 textIndex → Yeh kaunsa placeholder text type ho raha hai, yeh track karega.



  useEffect(() => {
    if (currentIndex < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        const updatedText = texts[textIndex].slice(0, currentIndex + 1);
        setCurrentText(updatedText);
        setCurrentIndex(prevIndex => prevIndex + 1);

        if (onUpdate) {
          onUpdate(updatedText);
        }
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      // Wait for `switchDelay` before changing text
      const switchTimeout = setTimeout(() => {
        setCurrentIndex(0);
        setTextIndex((prevTextIndex) => (prevTextIndex + 1) % texts.length);
        setCurrentText(''); // Reset text for typewriter effect
      }, switchDelay);
      //📌 Agar pura ek text complete ho gaya hai, toh:

      //2 sec (switchDelay) rukega.
      
      //TextIndex badal dega (Agla text start karega).
      
      //setCurrentText('') se text reset ho jayega.
      
      

      return () => clearTimeout(switchTimeout); 
    }
  }, [currentIndex, textIndex, delay, switchDelay, texts, onUpdate]);

  return null; // UI pe kuch show nahi hoga, bas placeholder update hoga
};

export default Typewriter;
