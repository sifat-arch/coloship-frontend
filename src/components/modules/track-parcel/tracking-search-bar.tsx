"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2, Navigation } from "lucide-react";

interface TrackingSearchBarProps {
  onSearch: (trackingNumber: string) => void;
  isLoading?: boolean;
  initialValue?: string;
}

export default function TrackingSearchBar({
  onSearch,
  isLoading = false,
  initialValue = "",
}: TrackingSearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center shadow-sm rounded-xl bg-card border overflow-hidden p-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
        <div className="pl-3.5 pr-2 text-muted-foreground flex items-center justify-center">
          <Navigation className="w-5 h-5 text-primary" />
        </div>

        <Input
          type="text"
          placeholder="Enter tracking number (e.g. CS-982341)..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-0 shadow-none focus-visible:ring-0 text-base py-3 px-1 h-auto font-mono placeholder:font-sans placeholder:text-sm"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-md mr-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <Button
          type="submit"
          size="default"
          disabled={!value.trim() || isLoading}
          className="h-10 px-5 rounded-lg gap-2 shrink-0 font-medium"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span>Track</span>
        </Button>
      </div>
    </form>
  );
}
