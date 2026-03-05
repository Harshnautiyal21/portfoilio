"use client";
import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig } from "@/content/config";

/** Base delay before bot responds (ms). */
const BASE_TYPING_DELAY = 900;
/** Random additional variance added to typing delay (ms). */
const TYPING_DELAY_VARIANCE = 400;

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

let msgId = 0;

function getBotResponse(userInput: string): string {
  const text = userInput.toLowerCase().trim();

  if (/^(hi|hello|hey|howdy|sup|greetings)/.test(text)) {
    return "Hello! I'm JARVIS, Harsh's AI assistant. How can I help you learn about his work?";
  }

  if (/help/.test(text)) {
    return (
      "Here's what you can ask me about:\n" +
      "• skills / what can he do\n" +
      "• projects / work\n" +
      "• experience / journey\n" +
      "• contact / hire / email\n" +
      "• resume / cv"
    );
  }

  if (/skills|what can he do|technologies|tech stack/.test(text)) {
    const allSkills = portfolioConfig.skills
      .flatMap((g) => g.items.map((i) => i.name))
      .join(", ");
    return `Harsh's technical skills include: ${allSkills}. He specialises in AI/ML engineering, data pipelines, and cloud infrastructure.`;
  }

  if (/projects|work|built|portfolio/.test(text)) {
    const titles = portfolioConfig.projects.map((p) => `• ${p.title}`).join("\n");
    return `Harsh's featured projects:\n${titles}\n\nAsk me about any specific project for details!`;
  }

  if (/autoagent/.test(text)) {
    const p = portfolioConfig.projects[0];
    return `${p.title}: ${p.description}`;
  }

  if (/streamiq/.test(text)) {
    const p = portfolioConfig.projects[1];
    return `${p.title}: ${p.description}`;
  }

  if (/churnsense|churn/.test(text)) {
    const p = portfolioConfig.projects[2];
    return `${p.title}: ${p.description}`;
  }

  if (/experience|journey|timeline|background/.test(text)) {
    const highlights = portfolioConfig.timeline
      .slice(0, 3)
      .map((t) => `• ${t.year}: ${t.title}`)
      .join("\n");
    return `Harsh's journey:\n${highlights}\n...and more! He's currently pursuing MCA while building AI systems.`;
  }

  if (/contact|hire|email|reach|connect/.test(text)) {
    return (
      `You can reach Harsh at:\n` +
      `📧 ${portfolioConfig.contact.email}\n` +
      `💼 ${portfolioConfig.contact.linkedin}\n` +
      `🐙 ${portfolioConfig.contact.github}`
    );
  }

  if (/resume|cv|download/.test(text)) {
    return `You can download Harsh's resume here: ${portfolioConfig.resumeUrl}. He's open to AI Engineering, Data Engineering, and ML Engineering roles.`;
  }

  if (/name|who (is|are) (harsh|you)/.test(text)) {
    return `${portfolioConfig.about}`;
  }

  return "I'm not sure about that, but you can type 'help' to see what I can tell you about Harsh!";
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: msgId++,
    role: "bot",
    text: "👋 Hello! I'm JARVIS, Harsh's AI assistant. Ask me about his skills, projects, experience, or how to get in touch!",
  },
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: Message = { id: msgId++, role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setIsTyping(true);

      setTimeout(() => {
        const botText = getBotResponse(trimmed);
        const botMsg: Message = { id: msgId++, role: "bot", text: botText };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, BASE_TYPING_DELAY + Math.random() * TYPING_DELAY_VARIANCE);
    },
    [isTyping]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(inputText);
  };

  return (
    <>
      {/* Floating chat button — sits above the terminal button */}
      <motion.button
        onClick={() => setIsOpen((p) => !p)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-cyan-400 border border-cyan-400/40"
        style={{
          background: "rgba(0,20,40,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 20px rgba(0,212,255,0.25)",
        }}
        animate={{
          boxShadow: [
            "0 0 12px rgba(0,212,255,0.2)",
            "0 0 28px rgba(0,212,255,0.5)",
            "0 0 12px rgba(0,212,255,0.2)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        aria-label="Toggle JARVIS AI Chat"
        title="JARVIS AI Assistant"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-[168px] right-6 z-40 w-[360px] max-w-[calc(100vw-24px)] rounded-xl overflow-hidden flex flex-col"
            style={{
              height: 480,
              background: "rgba(2,10,20,0.92)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(0,212,255,0.25)",
              boxShadow: "0 0 40px rgba(0,212,255,0.1), 0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-cyan-400/20 shrink-0"
              style={{ background: "rgba(0,212,255,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{
                    background: "radial-gradient(circle, #00D4FF33, #00305040)",
                    border: "1px solid rgba(0,212,255,0.4)",
                  }}
                >
                  🤖
                </div>
                <div>
                  <p className="font-orbitron text-xs text-cyan-400 tracking-wide leading-none">
                    JARVIS AI Assistant
                  </p>
                  <p className="text-[10px] text-green-400/70 mt-0.5">● Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-cyan-400 transition-colors text-xs"
                aria-label="Close chatbot"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "text-white rounded-br-none"
                        : "text-cyan-100 rounded-bl-none"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: "rgba(0,212,255,0.18)",
                            border: "1px solid rgba(0,212,255,0.3)",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div
                      className="flex items-center gap-1 px-3 py-2 rounded-xl rounded-bl-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-3 py-3 border-t border-cyan-400/20 shrink-0"
              style={{ background: "rgba(0,212,255,0.03)" }}
            >
              <input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-transparent outline-none text-xs text-slate-200 placeholder-slate-600 caret-cyan-400"
                autoComplete="off"
                spellCheck={false}
                disabled={isTyping}
              />
              <button
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim() || isTyping}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10 transition-colors disabled:opacity-30"
                aria-label="Send message"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
