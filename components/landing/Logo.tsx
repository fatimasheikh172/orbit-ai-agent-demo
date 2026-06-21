'use client';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 60,
    md: 100,
    lg: 140,
  };

  const dimension = sizes[size];
  const centerX = dimension / 2;
  const centerY = dimension / 2;
  const radius = dimension / 3;

  return (
    <svg width={dimension} height={dimension} viewBox={`0 0 ${dimension} ${dimension}`}>
      {/* Center dot */}
      <circle cx={centerX} cy={centerY} r={6} fill="#06b6d4" />

      {/* Orbiting dots - using pure CSS animation */}
      {[0, 120, 240].map((startAngle, i) => {
        const pathId = `orbit-path-${i}`;

        return (
          <g key={i}>
            <circle
              r={4}
              fill="#06b6d4"
              opacity="0.6"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path={`M ${centerX + radius} ${centerY} A ${radius} ${radius} 0 1 1 ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`}
                begin={`${i * 1.33}s`}
              />
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}

      {/* Orbit path */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="#06b6d4"
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>
  );
}
