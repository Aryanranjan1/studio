
'use client';

import React, { useState, useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, orderBy, where, doc } from 'firebase/firestore';
import type { Message, SiteConfiguration } from '@/lib/data';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, Inbox as InboxIcon, Archive, Trash2, Reply, Bot, Mail, MessageSquare } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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
            {message.status === 'unread' && !message.isArchived && (
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

function MessageDisplay({
  message,
  settings,
  onActionComplete,
}: {
  message: Message | null;
  settings: SiteConfiguration | null;
  onActionComplete: () => void;
}) {
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

    const handleArchiveToggle = () => {
        if (!firestore || !message) return;
        archiveMessage(firestore, message.id, !message.isArchived);
        toast({
            title: message.isArchived ? "Message moved to inbox" : "Message Archived",
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
  
    const hasEmail = !!message.senderEmail;
    const hasPhone = !!message.senderPhone;
    const canReplyByEmail = hasEmail && settings?.emailConfig?.enabled;
  
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center p-4 border-b">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" disabled={isReplying} onClick={handleArchiveToggle}>
                    <Archive className="h-4 w-4" />
                    <span className="sr-only">{message.isArchived ? "Unarchive" : "Archive"}</span>
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
             <div className="ml-auto flex items-center gap-2">
                {canReplyByEmail && hasPhone ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button disabled={message.isArchived}>
                        <Reply className="mr-2 h-4 w-4" /> Reply
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setIsReplying(true)}>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Reply via Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href={`https://wa.me/${message.senderPhone}`} target="_blank" rel="noopener noreferrer">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Chat on WhatsApp</span>
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : canReplyByEmail ? (
                  <Button onClick={() => setIsReplying(!isReplying)} disabled={message.isArchived}>
                    <Reply className="mr-2 h-4 w-4" /> {isReplying ? 'Cancel' : 'Reply'}
                  </Button>
                ) : hasPhone ? (
                  <Button asChild disabled={message.isArchived}>
                    <a href={`https://wa.me/${message.senderPhone}`} target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" /> Chat on WhatsApp
                    </a>
                  </Button>
                ) : null}
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
                    <div className="text-xs text-muted-foreground flex flex-col">
                        {message.senderEmail && <span>{message.senderEmail}</span>}
                        {message.senderPhone && <span>{message.senderPhone}</span>}
                    </div>
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
                        {settings?.aiConfig?.enabled ? (
                            <Button variant="ghost" size="sm">
                                <Bot className="mr-2 h-4 w-4" />
                                Generate with AI
                            </Button>
                        ) : <div />}
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
  const [view, setView] = useState<'inbox' | 'archived'>('inbox');

  const settingsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'site_settings', 'config');
  }, [firestore]);
  const { data: settings, isLoading: settingsLoading } = useDoc<SiteConfiguration>(settingsRef);

  const messagesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'messages'), 
      where('isArchived', '==', view === 'archived')
    );
  }, [firestore, view]);

  const { data: messages, isLoading: messagesLoading, error } = useCollection<Message>(messagesQuery);
  
  const sortedMessages = useMemo(() => {
      if (!messages) return [];
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
  
  const isLoading = messagesLoading || settingsLoading;

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
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-lg font-semibold">{view === 'inbox' ? 'Inbox' : 'Archived'}</h1>
                <div className="flex items-center gap-1">
                    <Button variant={view === 'inbox' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('inbox')}>Inbox</Button>
                    <Button variant={view === 'archived' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('archived')}>Archived</Button>
                </div>
            </div>
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
                No messages found.
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col">
        <MessageDisplay 
            message={selectedMessageData} 
            settings={settings}
            onActionComplete={handleActionComplete} 
        />
      </div>
    </div>
  );
}

    