"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getMessages, deleteMessage } from "@/lib/firestore";
import type { Message } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const messagesData = await getMessages();
      setMessages(messagesData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteClick = (messageId: string) => {
    setMessageToDelete(messageId);
    setIsAlertOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!messageToDelete) return;
    try {
      await deleteMessage(messageToDelete);
      toast({
        title: "Success",
        description: "Message deleted successfully.",
      });
      fetchMessages(); // Refresh the list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    } finally {
      setIsAlertOpen(false);
      setMessageToDelete(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
        <p className="text-muted-foreground">View messages submitted through your contact form.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg">
            <p className="text-lg font-semibold text-muted-foreground">No messages yet.</p>
            <p className="text-sm text-muted-foreground">New submissions will appear here.</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Accordion type="multiple" className="w-full">
            {messages.map((message) => (
              <AccordionItem value={message.id} key={message.id}>
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                    <div className="flex justify-between w-full items-center pr-4">
                        <div className="flex-1 text-left">
                            <p className="font-bold">{message.name}</p>
                            <p className="text-sm text-muted-foreground">{message.email}</p>
                        </div>
                        <Badge variant="secondary" className="mr-4">{message.service}</Badge>
                        <p className="text-sm text-muted-foreground">{message.submittedAt?.toLocaleDateString()}</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2 bg-muted/50">
                  <div className="flex justify-between items-start">
                    <div>
                        {message.phone && <p className="mb-2"><strong>Phone:</strong> {message.phone}</p>}
                        <p className="text-muted-foreground">{message.details}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(message.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
