"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  texts: string | string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
  as?: React.ElementType;
}

export function Typewriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  delay = 2000,
  className,
  cursorClassName,
  as: Tag = 'p',
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);
  
  const textArray = Array.isArray(texts) ? texts : [texts];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % textArray.length;
      const fullText = textArray[i];

      if (isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(deleteSpeed);
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(speed);
      }

      if (!isDeleting && displayedText === fullText) {
        if (textArray.length > 1) {
            timerRef.current = setTimeout(() => setIsDeleting(true), delay);
        }
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    
    timerRef.current = setTimeout(handleTyping, typingSpeed);

    return () => {
        if(timerRef.current) {
            clearTimeout(timerRef.current)
        }
    };
  }, [displayedText, isDeleting, loopNum, textArray, speed, deleteSpeed, delay, typingSpeed]);


  return (
    <Tag className={cn(className)}>
      {displayedText}
      <span className={cn(cursorClassName)}>.</span>
    </Tag>
  );
}
