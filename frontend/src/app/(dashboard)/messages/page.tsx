"use client";

import { Send, MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProjects, fetchMessages, createMessage } from "@/lib/api";
import { socket } from "@/lib/socket";

export default function MessagesPage() {
  const queryClient = useQueryClient();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch projects for the sidebar
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects
  });

  // Fetch messages for active project
  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ['messages', activeProjectId],
    queryFn: () => fetchMessages(activeProjectId!),
    enabled: !!activeProjectId
  });

  // Extract user ID from localStorage (JWT payload typically, but here we can just use the first message's sender to distinguish if needed, or parse token).
  // For simplicity, we just assume `sender._id` vs others. We'll set the userId from local storage if available.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserId(payload.id);
        } catch (e) {}
      }
    }
  }, []);

  // Socket connection
  useEffect(() => {
    socket.connect();

    socket.on('receive_message', (newMessage) => {
      if (newMessage.project === activeProjectId) {
        queryClient.setQueryData(['messages', activeProjectId], (old: any) => {
          return [...(old || []), newMessage];
        });
      }
    });

    return () => {
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [activeProjectId, queryClient]);

  // Join room when active project changes
  useEffect(() => {
    if (activeProjectId) {
      socket.emit('join_project', activeProjectId);
    }
  }, [activeProjectId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const mutation = useMutation({
    mutationFn: (msg: string) => createMessage(activeProjectId!, msg),
    onSuccess: (newMessage) => {
      queryClient.setQueryData(['messages', activeProjectId], (old: any) => {
        return [...(old || []), newMessage];
      });
      socket.emit('send_message', newMessage);
      setContent("");
    }
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !activeProjectId || mutation.isPending) return;
    mutation.mutate(content);
  };

  const activeProject = projects.find((p: any) => p._id === activeProjectId);

  return (
    <div className="h-[calc(100vh-8rem)] flex border border-white/10 rounded-xl overflow-hidden glass">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/10 flex flex-col bg-black/20">
        <div className="p-4 border-b border-white/10">
          <h2 className="font-bold text-lg">Project Rooms</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {projects.map((project: any) => (
            <div 
              key={project._id}
              onClick={() => setActiveProjectId(project._id)}
              className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                activeProjectId === project._id 
                  ? 'bg-primary/20 border-primary/50' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <h4 className="font-medium text-sm text-white truncate">{project.title}</h4>
              <p className="text-xs text-gray-400 mt-1">Client: {project.client?.name || 'Unknown'}</p>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-10">
              No projects found.
            </div>
          )}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {!activeProjectId ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
            <p>Select a project to view messages</p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center shadow-sm z-10">
              <h3 className="font-bold text-white">{activeProject?.title}</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loadingMessages ? (
                <div className="text-center text-sm text-gray-500 py-10">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="text-center text-sm text-gray-500 py-10">No messages yet. Say hello!</div>
              ) : (
                messages.map((msg: any) => {
                  // Determine if the message is from the logged-in user
                  const isOwn = msg.sender?._id === userId || msg.sender === userId;
                  return (
                    <div key={msg._id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3 rounded-2xl max-w-md text-sm ${
                        isOwn 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/10'
                      }`}>
                        {!isOwn && (
                          <div className="text-xs text-primary font-bold mb-1">
                            {msg.sender?.name || 'User'}
                          </div>
                        )}
                        <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40 flex gap-2">
              <input 
                type="text" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message..." 
                disabled={mutation.isPending}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors text-sm text-white"
              />
              <button 
                type="submit"
                disabled={!content.trim() || mutation.isPending}
                className="bg-primary hover:bg-primary/90 text-white p-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
