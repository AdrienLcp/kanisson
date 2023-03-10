import type { FC } from 'react';
import type { IconProps } from '../types/components/others';

const CrossedOutEyeIcon: FC<IconProps> = ({
  color = "var(--black)",
  height = "24"
}) => {

  return (
    <svg
      viewBox="0 0 24 24"
      height={height}
      width={height}
    >
      <g
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="m3 3l18 18M10.5 10.677a2 2 0 0 0 2.823 2.823" />
        <path d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6c1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 0 1-1.078 1.5" />
      </g>
    </svg>
  );
};

export default CrossedOutEyeIcon;