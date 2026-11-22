"use client";

export interface DemoFrameProps {
  src: string;
  title: string;
}

export function DemoFrame({ src, title }: DemoFrameProps) {
  return <div className="workbench searsuite-demo-frame" data-searsuite-component="DemoFrame"><iframe className="workbench-demo" src={src} title={title} /></div>;
}
