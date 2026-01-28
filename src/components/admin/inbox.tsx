
'use client';

import React, { useState, useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';
import type { Message } from '@/lib/data';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, Inbox as InboxIcon, Archive, Trash2, Reply, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { deleteMessage, archiveMessage } from '@/lib/firestore/messages';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';


function MessageListItem({
  message,
  isSelected,
  onSelect,
}: {
  message: Message;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
        isSelected && 'bg-muted'
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{message.senderName}</div>
            {message.status === 'unread' && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          <div
            className={cn(
              'ml-auto text-xs',
              isSelected ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {message.receivedAt && formatDistanceToNow(message.receivedAt.toDate(), { addSuffix: true })}
          </div>
        </div>
        <div className="text-xs font-medium">{message.subject}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {message.body.substring(0, 300)}
      </div>
    </button>
  );
}

function MessageDisplay({ message, onActionComplete }: { message: Message | null, onActionComplete: () => void }) {
    const [isReplying, setIsReplying] = useState(false);
    const { toast } = useToast();
    const firestore = useFirestore();

    const handleDelete = () => {
        if (!firestore || !message) return;
        deleteMessage(firestore, message.id);
        toast({
            title: "Message Deleted",
            description: "The message has been permanently deleted.",
        });
        onActionComplete();
    }

    const handleArchive = () => {
        if (!firestore || !message) return;
        archiveMessage(firestore, message.id, true);
        toast({
            title: "Message Archived",
        });
        onActionComplete();
    }
    
    if (!message) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                <InboxIcon className="w-10 h-10 mx-auto mb-4" />
                <p>Select a message to read</p>
                <p>No message selected</p>
            </div>
        );
    }
  
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center p-4 border-b">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" disabled={isReplying} onClick={handleArchive}>
                    <Archive className="h-4 w-4" />
                    <span className="sr-only">Archive</span>
                </Button>
                
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={isReplying}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Move to trash</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this message.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
             <div className="ml-auto">
                <Button onClick={() => setIsReplying(!isReplying)}>
                    <Reply className="mr-2 h-4 w-4" />
                    {isReplying ? 'Cancel' : 'Reply'}
                </Button>
            </div>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-6">
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">{message.senderName}</p>
                        <p className="text-xs text-muted-foreground">
                            {message.receivedAt && formatDistanceToNow(message.receivedAt.toDate(), { addSuffix: true })}
                        </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{message.senderEmail}</p>
                </div>
            </div>
            <h2 className="text-xl font-bold">{message.subject}</h2>
            <div
                className="text-sm prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: message.body.replace(/\n/g, '<br />') }}
            />
        </div>
        {isReplying && (
            <div className="p-4 bg-muted border-t">
                <div className="space-y-2">
                    <Textarea
                        placeholder={`Reply to ${message.senderName}...`}
                        rows={5}
                        className="bg-background"
                    />
                     <div className="flex justify-between">
                        <Button variant="ghost" size="sm">
                            <Bot className="mr-2 h-4 w-4" />
                            Generate with AI
                        </Button>
                        <Button>Send Reply</Button>
                     </div>
                </div>
            </div>
        )}
      </div>
    );
}

export function Inbox() {
  const firestore = useFirestore();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const messagesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // Query now filters out archived messages, but does not order.
    return query(
      collection(firestore, 'messages'), 
      where('isArchived', '==', false)
    );
  }, [firestore]);

  const { data: messages, isLoading, error } = useCollection<Message>(messagesQuery);
  
  const sortedMessages = useMemo(() => {
      if (!messages) return [];
      // Sort messages on the client-side
      return [...messages].sort((a, b) => {
          const dateA = a.receivedAt?.toDate ? a.receivedAt.toDate().getTime() : 0;
          const dateB = b.receivedAt?.toDate ? b.receivedAt.toDate().getTime() : 0;
          return dateB - dateA;
      });
  }, [messages]);
  
  const selectedMessageData = useMemo(() => {
      return sortedMessages?.find(m => m.id === selectedMessage) || null;
  }, [sortedMessages, selectedMessage]);
  
  const handleActionComplete = () => {
    setSelectedMessage(null);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="ml-2">Loading Messages...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive p-8">Error loading messages: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] h-full rounded-lg border shadow-sm">
      <div className="flex flex-col border-r overflow-y-auto">
        <div className="border-b p-4">
          <h1 className="text-lg font-semibold">Inbox</h1>
          <p className="text-sm text-muted-foreground">{sortedMessages.length || 0} messages</p>
        </div>
        <div className="flex flex-col gap-2 p-2">
          {sortedMessages && sortedMessages.length > 0 ? (
            sortedMessages.map(message => (
              <MessageListItem
                key={message.id}
                message={message}
                isSelected={selectedMessage === message.id}
                onSelect={() => setSelectedMessage(message.id)}
              />
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
                <InboxIcon className="w-8 h-8 mx-auto mb-2"/>
                No messages yet.
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col">
        <MessageDisplay message={selectedMessageData} onActionComplete={handleActionComplete} />
      </div>
    </div>
  );
}
