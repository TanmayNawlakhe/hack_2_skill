import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // ✨ MOTION: Import framer-motion
import { Send, Bot, User, Sparkles, FileText, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}

interface ChatInterfaceProps {
  documentName: string;
}

// ✨ MOTION: Animation variants for messages
const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ✨ MOTION: Animation variants for the suggestions container
const suggestionsContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

// ✨ MOTION: Animation variants for each suggestion item
const suggestionItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

// ✨ MOTION: Animation variants for the collapsible sources section
const sourcesVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { opacity: 1, height: 'auto', marginTop: '12px' },
};


export function ChatInterface({ documentName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I've analyzed ${documentName}. I can help you understand the risks, clauses, and legal implications. What would you like to know?`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSourcesId, setExpandedSourcesId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What are the main risks in this contract?",
    "Explain the termination clause in simple terms",
    "Are there any unusual clauses I should be aware of?",
    "What's the liability exposure in this agreement?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setExpandedSourcesId(null);

    setTimeout(() => {
      const newAssistantId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: newAssistantId,
        role: 'assistant',
        content: `Based on my analysis of ${documentName}, ${textToSend.toLowerCase().includes('risk') 
          ? 'the main risks include ambiguous termination clauses and limited liability caps. These could expose you to unexpected obligations.'
          : textToSend.toLowerCase().includes('termination')
          ? 'the termination clause allows either party to end the agreement with 30 days written notice. However, certain obligations survive termination, including confidentiality and payment terms.'
          : textToSend.toLowerCase().includes('unusual')
          ? 'I noticed an auto-renewal clause that may be uncommon. The contract automatically renews unless you provide notice 60 days before expiration.'
          : 'I found several important provisions that require careful review. Would you like me to explain any specific section in detail?'}`,
        timestamp: new Date().toISOString(),
        sources: [
          `Section 4.1 of ${documentName}`,
          `Appendix B, Page 12`,
          `Legal Precedent: Case #12-345`
        ]
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };
  
  const handleToggleSources = (messageId: string) => {
    setExpandedSourcesId(prevId => (prevId === messageId ? null : messageId));
  };

  return (
    <div className="h-full flex flex-col bg-[#0f1629]/30">
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence> {/* ✨ MOTION: Wrap message list for exit animations */}
            {messages.map((message) => (
              <motion.div // ✨ MOTION: Animate each message block
                key={message.id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                layout // ✨ MOTION: Smoothly animates layout changes
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl p-4 flex flex-col ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-[#1a1f3a]/50 border border-gray-800/50 text-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleToggleSources(message.id)}
                        className="flex items-center gap-2 text-xs text-gray-400 bg-[#2a304f]/50 hover:bg-[#2a304f] px-3 py-1 rounded-full transition-all border border-gray-700/50"
                      >
                        <FileText className="w-3 h-3" />
                        <span>{message.sources.length} Sources</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedSourcesId === message.id ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence> {/* ✨ MOTION: Animate the appearance of the sources list */}
                        {expandedSourcesId === message.id && (
                          <motion.div
                            key="sources-list"
                            variants={sourcesVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="space-y-2 border-l-2 border-blue-500/50 pl-3"
                          >
                            {message.sources.map((source, index) => (
                              <div key={index} className="text-xs text-gray-400 bg-[#1a1f3a]/40 p-2 rounded-md">
                                {source}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence> {/* ✨ MOTION: Animate loading indicator */}
            {isLoading && (
              <motion.div // ✨ MOTION: Animate the loading bubble
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-[#1a1f3a]/50 border border-gray-800/50 rounded-xl p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="border-t border-gray-800/50 bg-[#1a1f3a]/30 p-6">
        <div className="max-w-3xl mx-auto">
          {messages.length <= 1 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400 text-sm">Suggested questions:</span>
              </div>
              <motion.div // ✨ MOTION: Container for staggered suggestions
                className="grid grid-cols-2 gap-2"
                variants={suggestionsContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {suggestions.map((suggestion, idx) => (
                  <motion.button // ✨ MOTION: Animate each suggestion button
                    key={idx}
                    variants={suggestionItemVariants}
                    whileHover={{ scale: 1.03 }} // ✨ MOTION: Add hover effect
                    whileTap={{ scale: 0.98 }}   // ✨ MOTION: Add tap effect
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left p-3 rounded-lg bg-[#1a1f3a]/50 border border-gray-800/50 hover:border-blue-500/30 hover:bg-[#1a1f3a] text-gray-300 text-sm transition-all"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          )}

          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask about this document..."
              className="flex-1 min-h-[60px] max-h-[120px] bg-[#0f1629] items-center  border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 resize-none"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> {/* ✨ MOTION: Wrapper for send button interaction */}
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="h-[60px] w-[60px] px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}