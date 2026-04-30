import { useState, useEffect, useRef } from "react";
import { BACKEND_URL } from "../config";

const PERSONAS = {
    Kshitij: {
        suggestions: ["What's your take on startups?", "How do I stay productive?"],
    },
    Anshumann: {
        suggestions: ["Explain recursion simply", "How does the internet work?"],
    },
    Abhimanyu: {
        suggestions: ["Give me motivation", "How to stay disciplined daily?"],
    },
};

export default function Chat() {
    const [persona, setPersona] = useState("Kshitij");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const switchPersona = (p) => {
        setPersona(p);
        setMessages([]);
    };

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMsg = { type: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: text,
                    personality: persona,
                }),
            });

            const data = await res.json();

            const botMsg = {
                type: "bot",
                text: data.reply || "No reply",
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { type: "bot", text: "Error contacting server." },
            ]);
        }

        setLoading(false);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">

            <div className="flex flex-col h-[90vh] w-full max-w-2xl rounded-2xl 
                bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

                {/* Header */}
                <div className="p-4 border-b border-white/20 backdrop-blur-md">
                    <div className="flex gap-2 justify-center mb-2">
                        {Object.keys(PERSONAS).map((p) => (
                            <button
                                key={p}
                                onClick={() => switchPersona(p)}
                                className={`px-4 py-1.5 rounded-full text-sm transition-all
                                    ${persona === p
                                        ? "bg-white/30 text-white border border-white/40"
                                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="text-center text-sm text-gray-300">
                        Active Persona: <span className="font-semibold text-white">{persona}</span>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">

                    {messages.length === 0 && (
                        <div className="flex flex-wrap gap-2 justify-center">
                            {PERSONAS[persona].suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(s)}
                                    className="px-3 py-1 rounded-full text-sm
                                        bg-white/10 text-gray-200 hover:bg-white/20 backdrop-blur"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-xs sm:max-w-md px-4 py-2 rounded-xl text-sm
                                    backdrop-blur-md border shadow-lg
                                    ${msg.type === "user"
                                        ? "bg-blue-500/30 text-white border-blue-300/30"
                                        : "bg-white/10 text-gray-100 border-white/20"
                                    }`}
                            >
                                <div className="font-semibold mb-1 opacity-80">
                                    {msg.type === "user" ? "You" : persona}
                                </div>
                                <div className="whitespace-pre-line">{msg.text}</div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="px-4 py-2 rounded-xl text-sm
                                bg-white/10 text-gray-300 backdrop-blur-md border border-white/20">
                                {persona} is typing...
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/20 flex gap-2 backdrop-blur-md">
                    <input
                        type="text"
                        className="flex-1 px-3 py-2 rounded-lg 
                            bg-white/10 text-white placeholder-gray-400
                            border border-white/20
                            focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg
                            bg-blue-500/70 text-white
                            hover:bg-blue-500
                            disabled:opacity-50 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}