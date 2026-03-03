// MessageBubble.js
import React from "react";

export default function MessageBubble({ from, text }) {
  const isUser = from === "user";
  return (
    <div className={`d-flex ${isUser ? "justify-content-end" : "justify-content-start"} mb-2`}>
      <div
        className={`p-2 rounded-4 shadow-sm ${isUser ? "bg-success text-white" : "bg-secondary text-white"}`}
        style={{ maxWidth: "75%" }}
      >
        {text}
      </div>
    </div>
  );
}
