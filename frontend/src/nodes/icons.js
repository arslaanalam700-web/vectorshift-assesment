// icons.js
// Minimal hand-drawn icon set, one per node category.
// Kept dependency-free (no icon package) so the project installs and runs as-is.

const base = {
  width: 15,
  height: 15,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const InputIcon = () => (
  <svg {...base}>
    <path d="M4 12h11" />
    <path d="M11 7l5 5-5 5" />
    <path d="M20 5v14" />
  </svg>
);

export const OutputIcon = () => (
  <svg {...base}>
    <path d="M9 12h11" />
    <path d="M15 7l5 5-5 5" />
    <path d="M4 5v14" />
  </svg>
);

export const LLMIcon = () => (
  <svg {...base}>
    <rect x="4" y="6" width="16" height="12" rx="3" />
    <path d="M9 10v4M15 10v4M9 12h6" />
  </svg>
);

export const TextIcon = () => (
  <svg {...base}>
    <path d="M5 6h14" />
    <path d="M5 12h14" />
    <path d="M5 18h8" />
  </svg>
);

export const MathIcon = () => (
  <svg {...base}>
    <path d="M6 6h5M6 10h5" />
    <path d="M8 5v6" />
    <path d="M15 8h5" />
    <path d="M6 16h12" />
    <path d="M6 20h12" />
  </svg>
);

export const FilterIcon = () => (
  <svg {...base}>
    <path d="M4 5h16l-6 7v6l-4 2v-8z" />
  </svg>
);

export const DelayIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="13" r="7" />
    <path d="M12 9v4l3 2" />
    <path d="M9 2h6" />
  </svg>
);

export const APIIcon = () => (
  <svg {...base}>
    <path d="M8 4l-5 8 5 8" />
    <path d="M16 4l5 8-5 8" />
    <path d="M13 4l-2 16" />
  </svg>
);

export const MergeIcon = () => (
  <svg {...base}>
    <path d="M5 4v6c0 2 1.5 3.5 3.5 3.5H14" />
    <path d="M5 20v-6c0-2 1.5-3.5 3.5-3.5H14" />
    <path d="M13 10l4-3.5L13 3" />
    <path d="M13 21l4-3.5L13 14" />
  </svg>
);
