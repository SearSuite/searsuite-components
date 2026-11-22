"use client";

import { useState } from 'react';
import { Button } from './Button.js';

export interface FeedbackProps {
  question?: string;
}

export function Feedback({ question = 'Was this page helpful?' }: FeedbackProps) {
  const [value, setValue] = useState<'yes' | 'no' | null>(null);
  return <div className="searsuite-feedback">
    <h2>{question}</h2>
    <div>
      <Button variant="feedback" selected={value === 'yes'} onClick={() => setValue('yes')}>Yes</Button>
      <Button variant="feedback" selected={value === 'no'} onClick={() => setValue('no')}>No</Button>
    </div>
    {value && <p role="status">Thanks for your feedback.</p>}
  </div>;
}
