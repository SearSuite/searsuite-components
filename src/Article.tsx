"use client";

import type { ReactNode } from 'react';
import { CopyButton } from './CopyButton.js';
import { Feedback } from './Feedback.js';
import { Section } from './Section.js';
import { SourceLink } from './SourceLink.js';
import type { DocSection } from './types.js';

export interface ArticleProps {
  title: string;
  intro?: ReactNode;
  sections: DocSection[];
  markdown?: string;
  sourceHref?: string;
  feedback?: boolean;
}

export function Article({ title, intro, sections, markdown, sourceHref, feedback = false }: ArticleProps) {
  return (
    <article className="searsuite-article">
      <header className="searsuite-article-header">
        <h1>{title}</h1>
        {intro && <div className="searsuite-lead">{intro}</div>}
        {(markdown || sourceHref) && (
          <div className="searsuite-article-actions">
            {markdown && <CopyButton markdown={markdown} />}
            {sourceHref && <SourceLink href={sourceHref} />}
          </div>
        )}
      </header>
      <div className="searsuite-article-body">
        {sections.map(section => <Section key={section.id} id={section.id} title={section.title}>{section.content}</Section>)}
      </div>
      {feedback && <Feedback />}
    </article>
  );
}
