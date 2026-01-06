import { useEffect, useRef, useState } from "react";
import {
  FaComments,
  FaPaperPlane,
  FaTimes,
  FaRobot,
  FaUser
} from "react-icons/fa";

const ChatBot = () => {
  const botReplies = (message) => {
    const text = message.toLowerCase();

    if (text.includes("hello") || text.includes("hi")) {
      return "Hi 👋 How can I help you today?";
    }

    if (text.includes("hostel")) {
      return "We help manage hostels, PGs, bookings, rent & complaints.";
    }

    if (text.includes("contact")) {
      return "You can contact us at support@hostelapp.com 📧";
    }

    if (text.includes("price") || text.includes("cost")) {
      return "Pricing depends on hostel size. Please contact our team 💼";
    }

    return "I'm not sure 🤔 Can you please rephrase?";
  };
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello 👋 I’m HostelBot. How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage = {
        from: "bot",
        text: botReplies(input)
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center hover:scale-110 transition z-50"
      >
        <FaComments size={22} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">

          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaRobot />
              <span className="font-semibold">HostelBot</span>
            </div>
            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow
                    ${msg.from === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-slate-700 rounded-bl-none"}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;