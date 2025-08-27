import React, { useState } from "react";
import { FaSearch, FaBell, FaCog, FaQuestionCircle } from "react-icons/fa";

export default function Interactions() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "doctor",
      text: "Hello Mr. Anderson, how are you feeling today? Have you been taking the medication as prescribed?",
      time: "12:30 PM",
    },
    {
      id: 2,
      sender: "patient",
      text: "Hi Dr. Johnson, I'm feeling much better today. Yes, I've been taking the medication regularly, but I have a question about the dosage.",
      time: "12:32 PM",
    },
    {
      id: 3,
      sender: "patient",
      text: "Should I take the blood pressure medication before or after meals? The instructions weren't clear.",
      time: "12:33 PM",
    },
    {
      id: 4,
      sender: "doctor",
      text: "I'm glad you're feeling better. For the blood pressure medication (Lisinopril), it's best to take it at the same time each day. It can be taken with or without food, but taking it after breakfast is often recommended to establish a routine.",
      time: "12:36 PM",
    },
    {
      id: 5,
      sender: "doctor",
      text: "I'm sending you the detailed medication schedule we discussed during your last visit. Please follow this schedule carefully.",
      time: "12:36 PM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages([
      ...messages,
      { id: Date.now(), sender: "patient", text: newMessage.trim(), time },
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col bg-white">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-red-600">DHCRS</h1>
        </div>
        <div className="p-3 border-b flex items-center bg-gray-50">
          <FaSearch className="h-4 w-4 text-gray-400 mr-2" />
          <input
            placeholder="Search conversations..."
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {[
            {
              initials: "DR",
              name: "Dr. Sarah Johnson",
              role: "Doctor",
              time: "12:45 PM",
              msg: "I'll send you the prescription...",
              active: true,
            },
            {
              initials: "DM",
              name: "Dr. Michael Chen",
              role: "Doctor",
              time: "Yesterday",
              msg: "Your lab results are ready...",
            },
            {
              initials: "NT",
              name: "Nurse Taylor",
              role: "Nurse",
              time: "Mon",
              msg: "Your appointment is confirm...",
            },
            {
              initials: "DW",
              name: "Dr. Williams",
              role: "Doctor",
              time: "Sun",
              msg: "How are you feeling after t...",
            },
            {
              initials: "PH",
              name: "Pharmacy Help",
              role: "Support",
              time: "Fri",
              msg: "Your prescription is ready f...",
            },
          ].map((c, i) => (
            <div
              key={i}
              className={`flex items-center p-3 cursor-pointer border-b hover:bg-gray-50 ${
                c.active ? "bg-red-50" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center font-bold text-sm mr-3">
                {c.initials}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium text-sm">{c.name}</p>
                  <FaSearch className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">{c.time}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{c.role}</span>
                  <span>{c.msg}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center font-bold text-sm">
              DR
            </div>
            <div>
              <h2 className="font-semibold text-sm">
                Dr. Sarah Johnson{" "}
                <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  Cardiologist
                </span>
              </h2>
              <p className="text-xs text-gray-500">
                🟢 Online • Last seen just now
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <FaBell className="h-5 w-5 text-gray-500" />
            <FaCog className="h-5 w-5 text-gray-500" />
            <FaQuestionCircle className="h-5 w-5 text-gray-500" />
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold">
              P
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-sm">
          {messages.map((msg) =>
            msg.sender === "doctor" ? (
              <div key={msg.id} className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-xs font-bold">
                  DR
                </div>
                <div>
                  <div className="bg-red-100 p-3 rounded-lg max-w-lg">
                    {msg.text}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end">
                <div className="text-right">
                  <div className="bg-gray-100 p-3 rounded-lg max-w-lg inline-block">
                    {msg.text}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold ml-2">
                  PA
                </div>
              </div>
            )
          )}

          {/* Example of file attachment */}
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-xs font-bold">
              DR
            </div>
            <div>
              <div className="bg-red-100 p-3 rounded-lg max-w-lg">
                I'm sending you the detailed medication schedule we discussed
                during your last visit. Please follow this schedule carefully.
              </div>
              <div className="bg-gray-100 border mt-2 p-2 rounded-md text-xs flex items-center justify-between">
                <span>📄 Medication_Schedule.pdf</span>
                <button className="text-red-600 hover:underline">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-red-200"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
