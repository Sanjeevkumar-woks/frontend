import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat", { username, message });
    setMessage("");
  };

  return (
    <div className="App">
      <h1>React Chat Room</h1>
      <div className="chatWindow">
        {messages.map((message, i) => (
          <div>
            {message.username === username ? (
              <p key={i} className="you">
                {message.message}
              </p>
            ) : (
              <p key={i} className="other">
                {message.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
