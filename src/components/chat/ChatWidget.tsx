import { useEffect, useMemo, useRef, useState } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// Note: using a native scroll container here for precise control
// (shadcn ScrollArea doesn't expose the viewport ref for auto-scroll)
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
};

const initialSuggestions = [
  "Track my order",
  "Pricing and plans",
  "Become a courier",
  "Login help",
  "Service areas",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hi there! I'm your Yilakun assistant. Ask me anything — tracking, pricing, or getting help.",
      ts: Date.now(),
    },
  ]);

  const [aiStatus, setAiStatus] = useState<"ai" | "error">("ai");

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !sending,
    [input, sending]
  );

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      ts: Date.now(),
    };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    // Always call backend chat endpoint with the up-to-date message snapshot
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const raw = await res.text();
      let data: any = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch (_) {
        data = {};
      }

      if (!res.ok) {
        const errText = data?.error || raw || res.statusText;
        throw new Error(`Chat API error ${res.status}: ${errText}`);
      }

      const reply = data?.reply;
      if (!reply || typeof reply !== "string") {
        throw new Error("Chat API response missing reply string");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
          ts: Date.now(),
        },
      ]);
      setAiStatus("ai");
    } catch (err) {
      console.error("ChatWidget AI error", err);
      setAiStatus("error");
      const help =
        err instanceof Error
          ? err.message
          : "AI call failed. See console for details.";
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: help,
          ts: Date.now(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <Button
          aria-label="Open chat"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={() => setOpen(true)}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}

      {open && (
        <Card className="w-[360px] max-w-[92vw] shadow-xl border bg-background">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">Yilakun Assistant</div>
              <Badge variant="outline" className="ml-2">
                {aiStatus === "ai" ? "AI" : "Error"}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-3">
            <div ref={scrollRef} className="h-64 overflow-y-auto pr-2">
              <div className="space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex gap-2",
                      m.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {m.role === "assistant" && (
                      <Avatar className="h-6 w-6 self-start">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-md px-3 py-2 text-sm",
                        m.role === "assistant"
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      {m.content}
                    </div>
                    {m.role === "user" && (
                      <Avatar className="h-6 w-6 self-start">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {sending && (
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <div className="animate-pulse">Assistant is typing…</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {initialSuggestions.map((s) => (
                <Button
                  key={s}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSend(s)}
                >
                  {s}
                </Button>
              ))}
            </div>

            <div className="mt-3 flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="min-h-[56px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (canSend) handleSend();
                  }
                }}
              />
              <Button
                disabled={!canSend}
                onClick={() => handleSend()}
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-2 text-[10px] text-muted-foreground">
              Powered by AI — use VITE_AI_API_KEY (Google AI Studio) or
              VITE_AI_API_URL + VITE_AI_API_KEY in .env.local
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
