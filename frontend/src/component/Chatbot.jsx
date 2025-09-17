import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Alex, your Alumni Connect assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart response system - our custom chatbot intelligence
  const getFallbackResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      return "Hello! I'm Alex, and I'm here to help you make the most of Alumni Connect. What would you like to know about our platform?";
    }
    
    if (message.includes('mentor') || message.includes('guidance')) {
      return "Perfect! Our mentorship program connects you with experienced professionals in your field. Browse mentor profiles, read about their expertise, and send connection requests. The process is simple and effective!";
    }
    
    if (message.includes('event') || message.includes('reunion')) {
      return "Exciting! We host regular networking events, webinars, and reunions. Check our Events section for upcoming activities where you can connect with fellow alumni and expand your network.";
    }
    
    if (message.includes('donate') || message.includes('contribution')) {
      return "Thank you for wanting to give back! Our secure donation system lets you support various causes - from scholarships to infrastructure projects. Every contribution makes a real difference to current students.";
    }
    
    if (message.includes('connect') || message.includes('network')) {
      return "Networking is what we do best! Search for alumni by industry, location, or graduation year. Join discussions, attend virtual meetups, and build meaningful professional relationships.";
    }
    
    if (message.includes('job') || message.includes('career') || message.includes('opportunity')) {
      return "Great question! We feature exclusive job postings and internships shared by our alumni network. Many successful career transitions happen right here on our platform!";
    }
    
    if (message.includes('student') || message.includes('current')) {
      return "Current students can access mentorship, attend exclusive events, apply for alumni-shared opportunities, and connect with graduates in their field of interest. It's all about building bridges!";
    }
    
    if (message.includes('help') || message.includes('how') || message.includes('?')) {
      return "I'm here to help! Ask me about finding mentors, upcoming events, making donations, networking opportunities, or any other Alumni Connect features. What interests you most?";
    }
    
    if (message.includes('thanks') || message.includes('thank')) {
      return "You're very welcome! Feel free to ask me anything else about Alumni Connect. I'm always here to help! 😊";
    }
    
    return "That's a great question! Alumni Connect is your gateway to meaningful connections - whether you're looking for mentorship, networking, events, or ways to give back. What specific area interests you?";
  };

  const generateResponse = async (userMessage) => {
    // Simulate thinking time for more realistic experience
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    return getFallbackResponse(userMessage);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Generate AI response
    const aiResponse = await generateResponse(inputText);
    
    const botMessage = {
      id: Date.now() + 1,
      text: aiResponse,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Find mentors in my field",
    "Upcoming events",
    "How to give back?",
    "Connect with alumni",
    "Job opportunities",
    "Student resources"
  ];

  const handleQuickQuestion = (question) => {
    setInputText(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl font-bold cursor-pointer"
        whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          backgroundColor: isOpen ? '#ef4444' : undefined
        }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-20 right-0 w-80 h-[500px] bg-white/98 backdrop-blur-xl border border-indigo-200/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ filter: 'drop-shadow(0 25px 50px rgba(99, 102, 241, 0.15))' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">
                  🤖
                </div>
                <div>
                  <h3 className="font-semibold">Alex - Alumni Assistant</h3>
                  <p className="text-xs opacity-90">Here to help you navigate Alumni Connect!</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg resize-none h-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="1"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  📤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;