"use client";
import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig } from "@/content/config";

type OutputLine = {
  id: number;
  type: "input" | "output" | "error" | "system";
  content: string;
};

let lineId = 0;
function makeLine(type: OutputLine["type"], content: string): OutputLine {
  return { id: lineId++, type, content };
}

function processCommand(cmd: string): OutputLine[] {
  const trimmed = cmd.trim().toLowerCase();

  switch (trimmed) {
    case "help":
      return [
        "Available commands:",
        "  help      — Show this help",
        "  about     — About Harsh Nautiyal",
        "  skills    — List technical skills",
        "  projects  — List featured projects",
        "  timeline  — Show career timeline",
        "  contact   — Show contact info",
        "  clear     — Clear the console",
        "  whoami    — Identity check",
        "  jarvis    — Talk to JARVIS",
      ].map((l) => makeLine("output", l));

    case "about":
      return [makeLine("output", portfolioConfig.about)];

    case "skills":
      return [
        makeLine("output", "Technical Skills:"),
        ...portfolioConfig.skills.flatMap((group) => [
          makeLine("output", `\n[${group.category}]`),
          ...group.items.map((item) => makeLine("output", `  ${item.icon}  ${item.name}`)),
        ]),
      ];

    case "projects":
      return portfolioConfig.projects.flatMap((p) => [
        makeLine("output", `\n▸ ${p.title}`),
        makeLine("output", `  ${p.description.slice(0, 100)}...`),
        makeLine("output", `  Tags: ${p.tags.join(", ")}`),
        makeLine("output", `  GitHub: ${p.githubUrl}`),
      ]);

    case "timeline":
      return [
        makeLine("output", "Career Timeline:"),
        ...portfolioConfig.timeline.map((t) =>
          makeLine("output", `  [${t.year}] ${t.title} — ${t.description}`)
        ),
      ];

    case "contact":
      return [
        makeLine("output", "Contact Information:"),
        makeLine("output", `  📧  Email:    ${portfolioConfig.contact.email}`),
        makeLine("output", `  💼  LinkedIn: ${portfolioConfig.contact.linkedin}`),
        makeLine("output", `  🐙  GitHub:   ${portfolioConfig.contact.github}`),
      ];

    case "whoami":
      return [
        makeLine("output", "You are a visitor exploring Harsh Nautiyal's portfolio."),
        makeLine("output", "Identity verified. Welcome, User."),
        makeLine("output", "Threat level: None. Access granted."),
      ];

    case "jarvis":
      return [
        makeLine("output", "Good to see you, sir."),
        makeLine("output", "All systems operational. Portfolio running at peak efficiency."),
        makeLine("output", "Shall I prepare an analysis of Harsh's capabilities?"),
        makeLine("output", "Type 'skills' or 'projects' to begin."),
      ];

    case "clear":
      return [{ id: lineId++, type: "system" as const, content: "__CLEAR__" }];

    case "":
      return [];

    default:
      return [
        makeLine("error", `Command not found: '${trimmed}'. Type 'help' for available commands.`),
      ];
  }
}

const WELCOME_LINES: OutputLine[] = [
  makeLine("system", "╔══════════════════════════════════╗"),
  makeLine("system", "║     JARVIS TERMINAL v2.0          ║"),
  makeLine("system", "╚══════════════════════════════════╝"),
  makeLine("output", "Type 'help' to see available commands."),
  makeLine("output", ""),
];

export default function CommandConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<OutputLine[]>(WELCOME_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcut Ctrl+J / Cmd+J
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "j") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const submitCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (trimmed) {
        setHistory((prev) => [trimmed, ...prev]);
      }
      setHistoryIdx(-1);
      setInput("");

      const inputLine = makeLine("input", `> ${cmd}`);
      const result = processCommand(cmd);

      // Handle clear
      if (result.some((l) => l.content === "__CLEAR__")) {
        setLines([...WELCOME_LINES]);
        return;
      }

      setLines((prev) => [...prev, inputLine, ...result]);

      // Scroll to section
      const sectionMap: Record<string, string> = {
        skills: "skills",
        projects: "projects",
        timeline: "timeline",
        contact: "contact",
      };
      if (sectionMap[trimmed.toLowerCase()]) {
        const el = document.getElementById(sectionMap[trimmed.toLowerCase()]);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(nextIdx);
      if (history[nextIdx] !== undefined) setInput(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(nextIdx);
      setInput(nextIdx === -1 ? "" : history[nextIdx] ?? "");
    }
  };

  const textColor = (type: OutputLine["type"]) => {
    switch (type) {
      case "input":
        return "text-white";
      case "error":
        return "text-red-400";
      case "system":
        return "text-cyan-300";
      default:
        return "text-green-300";
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setIsOpen((p) => !p)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-cyan-400 border border-cyan-400/40"
        style={{
          background: "rgba(0,20,40,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 20px rgba(0,212,255,0.25)",
        }}
        animate={{ boxShadow: ["0 0 12px rgba(0,212,255,0.2)", "0 0 28px rgba(0,212,255,0.5)", "0 0 12px rgba(0,212,255,0.2)"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Toggle Jarvis Terminal (Ctrl+J)"
        title="JARVIS Terminal (Ctrl+J)"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      </motion.button>

      {/* Console panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 w-[480px] max-w-[calc(100vw-24px)] rounded-xl overflow-hidden"
            style={{
              background: "rgba(2,10,20,0.92)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(0,212,255,0.25)",
              boxShadow: "0 0 40px rgba(0,212,255,0.1), 0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-cyan-400/20"
              style={{ background: "rgba(0,212,255,0.06)" }}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-orbitron text-xs text-cyan-400 tracking-widest">
                  JARVIS TERMINAL v2.0
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-cyan-400 transition-colors text-xs"
                aria-label="Close terminal"
              >
                ✕
              </button>
            </div>

            {/* Output area */}
            <div
              className="h-72 overflow-y-auto px-4 py-3 text-xs leading-relaxed"
              style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              {lines.map((line) => (
                <div key={line.id} className={`whitespace-pre-wrap ${textColor(line.type)}`}>
                  {line.content}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-t border-cyan-400/20"
              style={{ background: "rgba(0,212,255,0.03)" }}
            >
              <span className="text-cyan-400 text-xs" style={{ fontFamily: "monospace" }}>
                &gt;
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-xs text-green-300 caret-cyan-400"
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-cyan-400 text-xs"
              >
                ▋
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
