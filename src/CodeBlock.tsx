import Prism, { type Token } from 'prismjs';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-bash.js';
import type { ReactNode } from 'react';

const codeLanguages = { typescript: Prism.languages.extend('typescript', {}) };
Prism.languages.insertBefore('typescript', 'keyword', {
  definition: {
    pattern: /(\b(?:const|let|var|function|class|interface|type)\s+)[A-Za-z_$][\w$]*/,
    lookbehind: true,
  },
}, codeLanguages);

export interface CodeBlockProps {
  code: string;
  language?: 'typescript' | 'bash' | 'plaintext';
}

function renderToken(token: string | Token, key: number): ReactNode {
  if (typeof token === 'string') return token;
  const classes = ['token', token.type, ...(Array.isArray(token.alias) ? token.alias : token.alias ? [token.alias] : [])];
  const content = Array.isArray(token.content)
    ? token.content.map(renderToken)
    : typeof token.content === 'string' ? token.content : renderToken(token.content, 0);
  return <span className={classes.join(' ')} key={key}>{content}</span>;
}

export function CodeBlock({ code, language = 'plaintext' }: CodeBlockProps) {
  const grammar = language === 'typescript' ? codeLanguages.typescript : Prism.languages[language];
  const tokens = grammar ? Prism.tokenize(code, grammar) : [code];
  return <pre className="searsuite-code-block" data-searsuite-component="CodeBlock"><code className={`language-${language}`}>{tokens.map(renderToken)}</code></pre>;
}
