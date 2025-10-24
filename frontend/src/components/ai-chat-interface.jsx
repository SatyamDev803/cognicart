"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, Paperclip, Globe, ArrowUp, X } from "lucide-react";

const postQuery = async (question) => (await apiClient.post("/analytics/ask", { question })).data;

// Normalize model output to human-readable plain text.
function extractText(data) {
  if (!data || typeof data.answer !== "string") {
    return "Sorry, I received a response I couldn't understand.";
  }

  let s = data.answer;

  s = s.replace(/^\s*(Gemini reply|Assistant|User)\s*-\s*/i, "");

  s = s.replace(/```[\s\S]*?```/g, "");
  s = s.replace(/`([^`]*)`/g, "$1");

  s = s.replace(/^\s*#{1,6}\s*/gm, "");

  s = s.replace(/\*\*(.*?)\*\*/g, "$1");
  s = s.replace(/\*(.*?)\*/g, "$1");

  s = s.replace(/^\s*[-*]\s+/gm, "");

  s = s.replace(/^\s*\d+\.\s+/gm, "");

  s = s.replace(/^[\s\-•*]+$/gm, "");

  s = s.replace(/\n{2,}/g, "\n\n");

  s = s.trim();

  return s || "";
}

export function AiChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null); 

  const { mutate: askAgent, isPending } = useMutation({
    mutationFn: postQuery,
    onSuccess: (data) => {
      const answer = extractText(data); 
      setMessages((prev) => [...prev, { role: "bot", content: answer, ts: Date.now() }]);
    },
    onError: () => {
      setMessages((prev) => [...prev, { role: "bot", content: "Sorry, something went wrong. Please try again.", ts: Date.now() }]);
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isPending]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const trimmed = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: trimmed, ts: Date.now() }]);
    askAgent(trimmed);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      <div className="flex-1 flex flex-col overflow-hidden bg-transparent shadow-none border-0 !p-0 !py-0 !gap-0">

        {/* Header */}
        <div className="px-4 py-2 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">AI Sales Assistant</div>
              <div className="text-xs text-muted-foreground">Ask questions about your sales data</div>
            </div>
            {/* <div className="text-xs text-slate-400">Model: gemini-2.5-flash</div> */}
          </div>
        </div>

        {/* Scrollable messages */}
        <div className="relative flex-1 min-h-0">
          <ScrollArea ref={scrollRef} className="h-full !px-0 py-2">
            <div className="h-full space-y-3 bg-transparent px-3 py-0">
              {messages.map((msg, idx) => {
                const content = typeof msg.content === 'string' ? msg.content : String(msg.content || '');
                if (!content) return null;
                const isUser = msg.role === 'user';
                return (
                  <div key={idx} className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    {!isUser && (
                      <span className="flex-shrink-0 bg-muted rounded-full p-2">
                        <Bot className="h-5 w-5 text-muted-foreground" />
                      </span>
                    )}

                    <div className={`rounded-lg px-3 py-2 max-w-[80%] md:max-w-[60%] lg:max-w-[50%] ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
                    </div>

                    {isUser && (
                      <span className="flex-shrink-0 bg-primary text-primary-foreground rounded-full p-2">
                        <User className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                );
              })}

              {isPending && (
                <div className="flex items-end gap-2 justify-start">
                  <span className="flex-shrink-0 bg-muted rounded-full p-2">
                    <Bot className="h-5 w-5 text-muted-foreground" />
                  </span>
                  <div className="rounded-lg px-3 py-2 bg-muted flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Composer */}
        <form onSubmit={handleSubmit} className="px-2 py-2 flex-none sticky bottom-0 z-10">
          <div className="rounded-2xl border border-border p-2 min-h-[64px]">
            <div className="flex items-center gap-3">
              <button type="button" className="inline-flex items-center gap-2 px-2 py-1 mb-2 rounded-full bg-muted text-sm text-muted-foreground">@ Add context</button>
            </div>

            <div className="mt-0">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask, search, or make anything..."
                className="w-full resize-none bg-transparent placeholder:text-muted-foreground text-foreground rounded-2xl px-2 py-2 min-h-[48px] max-h-[160px]"
              />
            </div>

            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <button type="button" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><Paperclip className="h-4 w-4" /></button>
                <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground">Auto</span>
                <button type="button" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"><Globe className="h-4 w-4" /><span className="text-muted-foreground">All Sources</span></button>
              </div>

              <div className="flex items-center">
                <button aria-label="Send" type="submit" className="ml-3 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg"><ArrowUp className="h-4 w-4 text-primary-foreground" /></button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}