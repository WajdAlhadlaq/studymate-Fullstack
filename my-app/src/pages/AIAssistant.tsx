import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/api.ts";

// Define a message structure for chat
interface Message {
  text: string;
  sender: "user" | "ai";
}

const AIAssistant: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom when messages change or AI is typing
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Function to handle sending a question
  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage: Message = { text: question.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setQuestion("");
    setLoading(true);

    try {
      // Use the API_URL from services/api.ts
      const res = await axios.post(`${API_URL}/api/ask`, {
        message: question.trim(),
      });

      setMessages((prev) => [
        ...prev,
        { text: res.data.response, sender: "ai" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { text: "Error generating response. Please try again.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleAsk();
    }
  };

  // Component to render the centered welcome screen (when chat is empty)
  const WelcomeScreen = () => (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center" style={{ marginTop: '10vh' }}>
        {/* Paper Plane Icon */}
        <div 
            className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-4"
            style={{ width: '80px', height: '80px', border: '1px solid #dee2e6' }}
        >
            <i className="bi bi-send" style={{ fontSize: '2.5rem', color: '#007bff' }}></i> 
        </div>

        <h3 className="fw-bold mb-3">Welcome to StudyMate AI Assistant</h3>
        <p className="text-muted" style={{ maxWidth: '400px' }}>
            I'm here to help you find the perfect course, answer questions, and guide your learning journey.
        </p>
    </div>
  );
  
  // Component to render the chat history and loading state
  const ChatHistory = () => (
    <div
      ref={chatContainerRef}
      className="flex-grow-1 p-3 mb-3 bg-white overflow-auto"
      style={{ maxHeight: "calc(100vh - 200px)" }} 
    >
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`d-flex mb-3 ${
            msg.sender === "user"
              ? "justify-content-end"
              : "justify-content-start"
          }`}
        >
          <div
            className={`p-2 rounded-3 shadow-sm ${
              msg.sender === "user"
                ? "bg-primary text-white"
                : "bg-light text-dark border"
            }`}
            style={{ maxWidth: "70%", wordBreak: "break-word" }}
          >
            {msg.text}
          </div>
        </div>
      ))}

      {/* Loading indicator */}
      {loading && (
        <div className="text-muted d-flex justify-content-start mb-3">
            <div className="p-2 rounded-3 bg-light text-dark border" style={{ maxWidth: "70%" }}>
                AI is thinking...
            </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="container py-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* HEADER SECTION */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">AI Study Assistant</h2>
        <p className="text-muted mb-0">Ask me anything about courses</p>
        <hr />
      </div>

      {/* CHAT/WELCOME AREA */}
      <div className="d-flex flex-column" style={{ minHeight: '60vh' }}>
        {messages.length === 0 ? <WelcomeScreen /> : <ChatHistory />}
      </div>

      {/* INPUT AREA (Always visible at the bottom) */}
      <div className="d-flex mt-4 pt-3 border-top">
        <textarea
          className="form-control me-2 rounded-pill" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress} 
          placeholder="Type your question..."
          rows={1} 
          style={{ resize: 'none', minHeight: '40px', paddingTop: '10px' }}
        />
        {/* Send button (Styled as paper plane) */}
        <button
          className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center"
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          style={{ width: '60px', height: '40px' }}
        >
          <i className="bi bi-send-fill" style={{ fontSize: '1.2rem' }}></i>
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
