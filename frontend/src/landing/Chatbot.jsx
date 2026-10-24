import { useState, useRef, useEffect } from 'react';

// Predicted questions to show as quick buttons
const PREDICTED_QUESTIONS = [
  "How do I apply for a job?",
  "Are there any remote jobs?",
  "How can I contact support?",
];

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi there! I am the JobERP assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom when a new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isChatOpen) scrollToBottom();
  }, [messages, isChatOpen]);

  // Core logic to process messages (used by both input and quick buttons)
  const processMessage = (text) => {
    if (!text.trim()) return;

    // 1. Add user message
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
    
    // 2. Generate bot response
    setTimeout(() => {
      let botResponse = "I'm a simple hardcoded bot. Try asking about 'apply', 'remote', or 'support'.";
      const lower = text.toLowerCase();

      if (lower.includes('apply') || lower.includes('application')) {
        botResponse = "To apply, simply click the 'Apply Now' button on any job card. You'll be redirected to the application form.";
      } else if (lower.includes('remote')) {
        botResponse = "Yes! We have remote roles available. You can filter for 'Remote' in the Job Type section on the Jobs page.";
      } else if (lower.includes('support') || lower.includes('contact')) {
        botResponse = "You can reach our support team at support@joberp.com or call us at +1 (800) 123-4567.";
      } else if (lower.includes('hi') || lower.includes('hello')) {
        botResponse = "Hello! Looking for a new role today? Try clicking one of the suggested questions above.";
      } else if (lower.includes('job') || lower.includes('position') || lower.includes('role')) {
        botResponse = "We currently have thousands of open roles across IT, Healthcare, Finance, and more. Head over to the Jobs page to see them all!";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
    }, 800);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    processMessage(inputValue.trim());
    setInputValue('');
  };

  return (
    <>
      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-[400px] z-50 transition-all duration-300 origin-bottom-right ${
          isChatOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl shadow-orange-500/20 border border-slate-200 overflow-hidden flex flex-col h-[550px]">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">JobERP Assistant</h3>
                <p className="text-xs text-orange-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)} 
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-orange-500 text-white rounded-br-sm' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Predicted Questions */}
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Suggested Questions</p>
            <div className="flex flex-wrap gap-2">
              {PREDICTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => processMessage(q)}
                  className="text-xs font-medium bg-white text-orange-600 border border-orange-200 px-3 py-1.5 rounded-full hover:bg-orange-50 hover:border-orange-300 transition-colors text-left shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-100 border border-transparent rounded-full px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-100 text-slate-700 placeholder-slate-400 transition-all"
              />
              <button 
                type="submit" 
                className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-full shadow-md shadow-orange-500/30 transition-transform active:scale-90"
              >
                <svg className="w-5 h-5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-6 right-4 md:right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/40 transition-all duration-300 ${
          isChatOpen ? 'bg-slate-900 hover:bg-slate-800 rotate-90 scale-90' : 'bg-orange-500 hover:bg-orange-600 hover:scale-105'
        }`}
      >
        {isChatOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </>
  );
}