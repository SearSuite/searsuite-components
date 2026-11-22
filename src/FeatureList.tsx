"use client";

export interface FeatureCardProps {
  title: string;
  description: string;
  href?: string;
}

export function FeatureCard({ title, description, href }: FeatureCardProps) {
  const content = <><h3>{title}</h3><p>{description}</p></>;
  return href
    ? <a className="searsuite-feature-card" data-searsuite-component="FeatureCard" href={href}>{content}</a>
    : <article className="searsuite-feature-card" data-searsuite-component="FeatureCard">{content}</article>;
}

export interface FeatureListProps {
  items: FeatureCardProps[];
}

export function FeatureList({ items }: FeatureListProps) {
  return <div className="feature-list searsuite-feature-list" data-searsuite-component="FeatureList">{items.map(item => <FeatureCard key={item.title} {...item} />)}</div>;
}
