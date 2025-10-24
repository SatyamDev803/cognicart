"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import { AiChatInterface } from "./ai-chat-interface";

export default function ChatLauncher() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open chat"
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full p-4 shadow-2xl bg-primary text-primary-foreground hover:scale-110 transition-transform duration-200"
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md rounded-l-3xl shadow-xl overflow-hidden p-0 flex flex-col gap-0"
      >
        <div className="flex-1 min-h-0">
          <AiChatInterface />
        </div>
      </SheetContent>
    </Sheet>
  );
}