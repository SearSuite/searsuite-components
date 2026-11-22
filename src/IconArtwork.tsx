import { createElement, type SVGProps } from 'react';
import type { IconDefinition } from './strokeIcons.js';

export type IconArtworkProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'name'> & {
  definition: IconDefinition;
  size?: number | string;
};

export function IconArtwork({ definition, size = 24, ...props }: IconArtworkProps) {
  const accessible = Boolean(props['aria-label'] || props['aria-labelledby']);

  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={definition.viewBox}
    fill="none"
    aria-hidden={accessible ? undefined : true}
    role={accessible ? 'img' : undefined}
    {...props}
  >
    {definition.shapes.map(([tag, attributes], index) => createElement(tag, { ...attributes, key: index }))}
  </svg>;
}
