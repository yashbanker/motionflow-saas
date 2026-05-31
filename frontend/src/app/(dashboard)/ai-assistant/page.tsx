"use client";

import { Sparkles, Send, User, Bot, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAiHistory, sendAiMessage } from "@/lib/api";

export default function AIAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: conversation, isLoading } = useQuery({
    queryKey: ['ai-history'],
    queryFn: fetchAiHistory
  });

  const mutation = useMutation({
    mutationFn: sendAiMessage,
    onSuccess: (newData) => {
      queryClient.setQueryData(['ai-history'], newData);
      setPrompt("");
    }
  });

  const messages = conversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, mutation.isPending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || mutation.isPending) return;
    mutation.mutate(prompt);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          AI Copilot
        </h1>
        <p className="text-muted-foreground mt-1">Your intelligent assistant for ideation and project management.</p>
      </div>

      <div className="flex-1 glass rounded-xl border border-white/10 p-4 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : messages.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <Sparkles className="w-12 h-12 mb-4 text-primary opacity-50" />
                <p>Hello! How can I help you today?</p>
             </div>
          ) : (
            messages.map((msg: any, i: number) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none'
                }`}>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
            ))
          )}
          
          {mutation.isPending && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="max-w-[80%] rounded-2xl p-4 bg-white/5 border border-white/10 text-gray-200 rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-gray-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="pt-4 border-t border-white/10 mt-auto">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask MotionFlow AI anything..."
              disabled={mutation.isPending}
              className="w-full bg-black/40 border border-white/10 rounded-full pl-6 pr-14 py-4 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={!prompt.trim() || mutation.isPending}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary/90 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
