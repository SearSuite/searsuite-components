import type { SVGProps } from 'react';
import { IconArtwork } from './IconArtwork.js';
import { iconData, type IconName } from './strokeIcons.js';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'name'> & {
  name: IconName;
  size?: number | string;
};

export function Icon({ name, size = 24, ...props }: IconProps) {
  return <IconArtwork definition={iconData[name]} size={size} {...props} />;
}
