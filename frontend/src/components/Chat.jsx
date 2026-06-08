import {
  useState,
  useContext,
  useEffect,
  useRef
} from "react";

import socket from "../socket/socket";

import { GameContext } from "../context/GameContext";

import {
  Send,
  MessageCircle,
  Trophy,
  Info,
  Crown,
  Zap,
  Sparkles,
  Flame,
  Users,
  Star,
  Gift
} from "lucide-react";

function Chat({ roomId, isDrawer }) {

  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [quickResponses, setQuickResponses] = useState([
    "Nice drawing! 🎨",
    "I know this! 💡",
    "So close! 🔥",
    "Amazing! 👏",
    "Wow! 😮"
  ]);

  const {
    messages,
    setMessages,
    playerName
  } = useContext(GameContext);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Message counter effect
  useEffect(() => {
    const count = messages.filter(m => m.type === "message").length;
    setMessageCount(count);
  }, [messages]);

  // Socket listeners
  useEffect(() => {
    socket.off("receiveMessage");
    socket.off("correctGuess");
    socket.off("correctGuessSelf");
    socket.off("playerGuessed");
    socket.off("systemMessage");
    socket.off("typing");
    socket.off("clearChat");

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.type === "message" &&
            lastMessage?.message === data.message &&
            lastMessage?.playerName === data.playerName) {
          return prev;
        }
        return [...prev, { ...data, type: "message" }];
      });
    });

    socket.on("correctGuess", (data) => {
      if (data.player === playerName) return;
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.type === "correct" &&
            lastMessage?.text === `${data.player} guessed the word!`) {
          return prev;
        }
        return [...prev, { type: "correct", text: `${data.player} guessed the word!` }];
      });
    });

    socket.on("correctGuessSelf", (data) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.type === "self-correct" && lastMessage?.text === data.text) {
          return prev;
        }
        return [...prev, { type: "self-correct", text: data.text }];
      });
    });

    socket.on("playerGuessed", (data) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.type === "drawer-info" && lastMessage?.text === data.text) {
          return prev;
        }
        return [...prev, { type: "drawer-info", text: data.text }];
      });
    });

    socket.on("systemMessage", (data) => {
      setMessages((prev) => [...prev, { type: "system", text: data.text }]);
    });

    socket.on("typing", (name) => {
      setTypingUser(name);
      setTimeout(() => setTypingUser(""), 1500);
    });

    socket.on("clearChat", () => {
      setMessages([]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("correctGuess");
      socket.off("correctGuessSelf");
      socket.off("playerGuessed");
      socket.off("systemMessage");
      socket.off("typing");
      socket.off("clearChat");
    };
  }, [playerName, setMessages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    if (isDrawer) return;

    socket.emit("sendMessage", {
      roomId,
      message,
      playerName
    });
    setMessage("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", { roomId, playerName });
  };

  const emojis = ["😀", "😂", "😮", "🎨", "🏆", "🔥", "💀", "👑", "⭐", "🎯", "💡", "✨"];

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Chat Header - Crazy Style */}
      <div className="relative mb-4">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30"></div>
        <div className="relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-md animate-pulse"></div>
              <div className="relative p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500">
                <MessageCircle size={20} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                BATTLE CHAT
              </h2>
              <p className="text-xs text-cyan-400 flex items-center gap-1">
                <Zap size={10} className="animate-pulse" />
                {messageCount} messages exchanged
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
              <Users size={12} className="text-cyan-400" />
              <span className="text-xs text-cyan-400 font-mono">LIVE</span>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Typing Indicator - Enhanced */}
      {typingUser && typingUser !== playerName && (
        <div className="mb-3 p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 animate-slide-in">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm text-cyan-400 font-bold">{typingUser}</span>
            <span className="text-xs text-slate-400">is crafting a message...</span>
            <Sparkles size={12} className="text-yellow-400 animate-spin-slow" />
          </div>
        </div>
      )}

      {/* Messages Container - Enhanced */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar mb-4">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative">
                <MessageCircle size={60} className="mx-auto mb-3 text-cyan-500/30" />
                <p className="font-black text-slate-400">CHAT EMPTY</p>
                <p className="text-sm text-slate-500 mt-1">Be the first to guess! 🎯</p>
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, index) => {
          // System Message
          if (msg.type === "system") {
            return (
              <div key={`${msg.type}-${index}`} className="flex justify-center animate-fade-in">
                <div className="bg-gradient-to-r from-slate-500/20 to-slate-600/20 backdrop-blur-sm px-5 py-2 rounded-full text-xs flex items-center gap-2 border border-slate-500/30">
                  <Info size={12} className="text-cyan-400" />
                  <span className="text-slate-300">{msg.text}</span>
                </div>
              </div>
            );
          }

          // Correct Guess (Others)
          if (msg.type === "correct") {
            return (
              <div key={`${msg.type}-${index}`} className="flex justify-center animate-slide-in">
                <div className="relative overflow-hidden bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.2)] group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Trophy size={16} className="text-green-400 animate-bounce" />
                    <span className="text-green-400">{msg.text}</span>
                    <Flame size={14} className="text-orange-400 animate-pulse" />
                  </div>
                </div>
              </div>
            );
          }

          // Self Correct
          if (msg.type === "self-correct") {
            return (
              <div key={`${msg.type}-${index}`} className="flex justify-center animate-slide-in">
                <div className="relative bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-yellow-500/50 shadow-[0_0_20px_rgba(255,255,0,0.2)]">
                  <div className="flex items-center gap-2 font-bold">
                    <Star size={16} className="text-yellow-400 animate-spin-slow" />
                    <span className="text-yellow-400">{msg.text}</span>
                    <Gift size={14} className="text-orange-400 animate-pulse" />
                  </div>
                </div>
              </div>
            );
          }

          // Drawer Info
          if (msg.type === "drawer-info") {
            return (
              <div key={`${msg.type}-${index}`} className="flex justify-center animate-slide-in">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-purple-500/50 shadow-[0_0_20px_rgba(128,0,255,0.2)]">
                  <div className="flex items-center gap-2 font-bold">
                    <Crown size={16} className="text-purple-400 animate-pulse" />
                    <span className="text-purple-400">{msg.text}</span>
                  </div>
                </div>
              </div>
            );
          }

          // Normal Message
          const isMine = msg.playerName === playerName;
          return (
            <div
              key={`${msg.type}-${index}`}
              className={`flex ${isMine ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div className={`max-w-[85%] ${isMine ? "order-1" : "order-0"}`}>
                {!isMine && (
                  <div className="text-xs text-cyan-400 mb-1 ml-2 font-bold flex items-center gap-1">
                    <Users size={10} />
                    {msg.playerName}
                  </div>
                )}
                <div
                  className={`relative overflow-hidden group rounded-2xl px-4 py-2.5 break-words transition-all duration-300 ${
                    isMine
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:scale-105"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10">{msg.message}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Responses */}
      {!isDrawer && messages.length > 0 && (
        <div className="mb-3 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {quickResponses.map((response, idx) => (
            <button
              key={idx}
              onClick={() => {
                setMessage(response);
                setTimeout(() => sendMessage(), 100);
              }}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-cyan-500/30 text-xs text-cyan-400 whitespace-nowrap hover:bg-cyan-500/20 hover:border-cyan-500 transition-all hover:scale-105"
            >
              {response}
            </button>
          ))}
        </div>
      )}

      {/* Input Section - Enhanced */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30"></div>
        
        <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-3 border border-cyan-500/30">
          {isDrawer ? (
            <div className="relative overflow-hidden rounded-xl p-4 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
              <div className="relative flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="font-black text-purple-400">🎨 YOU ARE DRAWING</span>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">Focus on your masterpiece!</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="⚡ Type your guess..."
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-black/50 border-2 border-cyan-500/30 outline-none text-white placeholder:text-slate-500 transition-all focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                  value={message}
                  onChange={handleTyping}
                  onKeyDown={handleKeyDown}
                  maxLength={100}
                />
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl hover:scale-125 transition-transform"
                >
                  😀
                </button>
              </div>
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="relative w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(0,255,255,0.3)] group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Send size={18} className="text-white relative z-10" />
              </button>
            </div>
          )}
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && !isDrawer && (
          <div className="absolute bottom-full mb-2 left-0 bg-black/90 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-3 z-20 animate-slide-up">
            <div className="grid grid-cols-6 gap-2">
              {emojis.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMessage(message + emoji);
                    setShowEmojiPicker(false);
                    inputRef.current?.focus();
                  }}
                  className="text-2xl hover:scale-125 transition-transform p-2 hover:bg-cyan-500/20 rounded-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.2s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
}

export default Chat;