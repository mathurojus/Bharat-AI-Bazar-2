
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getChatbotResponse } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export function Chatbot() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setMessages([
        { id: 1, text: "Hello! How can I help you today? Feel free to ask about our features.", sender: "bot" },
      ]);
    }
  }, [isOpen]);

  React.useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const result = await getChatbotResponse({ message: input });
    setIsLoading(false);

    if (result.error || !result.data) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to get a response from the chatbot.",
      });
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I couldn't process that. Please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    const botMessage: Message = {
      id: Date.now() + 1,
      text: result.data.response,
      sender: "bot",
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-80 origin-bottom-right"
            >
              <Card className="flex h-[28rem] flex-col shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between border-b p-4">
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start gap-3 ${
                            message.sender === "user" ? "justify-end" : ""
                          }`}
                        >
                          {message.sender === "bot" && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Bot className="h-5 w-5" />
                            </div>
                          )}
                          <div
                            className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {message.text}
                          </div>
                           {message.sender === "user" && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                              <User className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                      ))}
                      {isLoading && (
                         <div className="flex items-start gap-3">
                           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Bot className="h-5 w-5" />
                            </div>
                            <div className="max-w-[75%] rounded-lg bg-muted px-3 py-2 text-sm">
                               <Icons.Loader className="animate-spin" />
                            </div>
                         </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                    <Input
                      placeholder="Ask a question..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
        >
        <Button
          size="lg"
          className="rounded-full shadow-lg h-16 w-16"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Chatbot"
        >
          {isOpen ? <X className="h-6 w-6"/> : <MessageSquare className="h-6 w-6"/>}
        </Button>
        </motion.div>
      </div>
    </>
  );
}
