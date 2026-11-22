import type { SVGProps } from 'react';
import { IconArtwork } from './IconArtwork.js';
import { uiIconData, type UiIconName } from './uiIconData.js';

export type UiIconProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'name'> & {
  name: UiIconName;
  size?: number | string;
};

export function UiIcon({ name, size = 24, ...props }: UiIconProps) {
  return <IconArtwork definition={uiIconData[name]} size={size} {...props} />;
}
