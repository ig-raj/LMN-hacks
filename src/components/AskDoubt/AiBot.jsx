import React, { useState } from "react";
import axios from "axios";

const AiBot = () => {
  const [userMessage, setUserMessage] = useState(""); // Store the user's message
  const [chatHistory, setChatHistory] = useState([]); // Store the conversation history
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const COHERE_API_KEY = "r2qyZzWTvlhucdudG1YiiyhjcKqFRIzH36HnzfaG";
  const COHERE_MODEL = "command-xlarge-nightly"; // Cohere's conversational model

  // Send a message to Cohere API and get the response
  const sendMessage = async () => {
    if (!userMessage) {
      setError("Please type a message.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Construct the prompt from the chat history
      const prompt = chatHistory
        .map((msg) => `${msg.role}: ${msg.message}`)
        .join("\n");
      const fullPrompt = `${prompt}\nUser: ${userMessage}\nAssistant:`;

      const response = await axios.post(
        "https://api.cohere.ai/v1/generate",
        {
          model: COHERE_MODEL,
          prompt: fullPrompt,
          max_tokens: 300, // Limit response length
          temperature: 0.7, // Adjust creativity
        },
        {
          headers: {
            Authorization: `Bearer ${COHERE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Add the user's message and the AI's response to the chat history
      setChatHistory([
        ...chatHistory,
        { role: "User", message: userMessage },
        { role: "Assistant", message: response.data.generations[0].text.trim() },
      ]);
      setUserMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error fetching response from Cohere:", error);
      setError("Failed to fetch a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Ask me anything
        </h1>
        <div className="chat-history bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto mb-4 border border-gray-300">
          {chatHistory.length === 0 ? (
            <p className="text-gray-500 text-center">Start the conversation!</p>
          ) : (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.role === "User" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.role === "User"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="flex-grow bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AiBot;
