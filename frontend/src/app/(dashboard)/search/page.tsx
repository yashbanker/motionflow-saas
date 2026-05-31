"use client";

import { useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Search Results
        </h1>
        <p className="text-muted-foreground mt-1">
          Showing results for &quot;{query}&quot;
        </p>
      </div>
      <div className="glass rounded-xl border border-white/10 p-6">
        <div className="py-20 text-center text-gray-500">
           <SearchIcon className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
           <p>Global search will be integrated soon.</p>
           <p className="text-sm mt-2">Currently searched for: <span className="text-white font-medium">{query}</span></p>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
