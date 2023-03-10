import type { FC } from 'react';
import type { IconProps } from '../types/components/others';

const BanIcon: FC<IconProps> = ({
  color = "var(--black)",
  height = "24"
}) => {

  return (
    <svg
      viewBox="0 0 24 24"
      height={height}
      width={height}
      fill="none"
      stroke="#2c2c2c"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        stroke={color}
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      />

      <polyline
        stroke={color}
        points="16 17 21 12 16 7"
      />

      <line
        stroke={color}
        x1="21"
        y1="12"
        x2="9"
        y2="12"
      />
    </svg>
  );
};

export default BanIcon;