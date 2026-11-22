"use client";

import { useEffect, useRef, useState } from 'react';
import { Button } from './Button.js';
import { UiIcon } from './UiIcon.js';

export interface CopyButtonProps {
  markdown: string;
}

export function CopyButton({ markdown }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return <Button onClick={copyMarkdown} aria-label={copied ? 'Markdown copied' : 'Copy Markdown'}>
    <UiIcon name={copied ? 'check' : 'copy'} size={16} />{copied ? 'Copied' : 'Copy Markdown'}
  </Button>;
}
