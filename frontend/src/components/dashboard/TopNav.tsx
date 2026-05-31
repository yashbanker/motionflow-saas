"use client";

import { Bell, Search, User, LayoutDashboard, Users, FolderKanban, FileText, MessageSquare, Receipt, CreditCard, Image as ImageIcon, FileOutput, PieChart, Settings, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_TABS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Files", href: "/files", icon: FileText },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Invoices", href: "/invoices", icon: Receipt },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Portfolio", href: "/portfolio", icon: ImageIcon },
  { name: "Blog", href: "/blog", icon: FileOutput },
  { name: "Analytics", href: "/analytics", icon: PieChart },
  { name: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function TopNav() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsFocused(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Suggestions based on sidebar tabs
  const getSuggestions = () => {
    if (!query) return [];
    const q = query.toLowerCase();
    return SIDEBAR_TABS.filter((tab) => tab.name.toLowerCase().includes(q))
      .map(tab => ({
        type: "Navigation",
        title: tab.name,
        icon: tab.icon,
        href: tab.href
      }));
  };

  const suggestions = getSuggestions();

  return (
    <header className="h-16 border-b border-white/10 glass px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div ref={wrapperRef} className="relative">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search for tabs (e.g., Projects, Clients)..." 
              className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </form>

          {/* Search Suggestions Dropdown */}
          <AnimatePresence>
            {isFocused && query.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 glass"
              >
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Suggestions
                  </div>
                  {suggestions.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuery(item.title);
                        setIsFocused(false);
                        router.push(item.href);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="p-2 bg-white/5 rounded-md text-gray-400">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.type}</div>
                      </div>
                    </button>
                  ))}
                  
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <button 
                      onClick={() => {
                        setIsFocused(false);
                        router.push(`/search?q=${encodeURIComponent(query)}`);
                      }}
                      className="w-full text-center px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      See all results for &quot;{query}&quot;
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Link href="/notifications" className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border border-[#030712]"></span>
        </Link>
        <div className="h-8 w-px bg-white/10 mx-2"></div>
        <Link href="/profile" className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="hidden md:inline">Admin</span>
        </Link>
      </div>
    </header>
  );
}
