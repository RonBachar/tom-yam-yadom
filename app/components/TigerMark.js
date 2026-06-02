export default function TigerMark({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="20" cy="20" r="18.5" stroke="#C9940A" strokeWidth="1.2" opacity="0.7" />

      {/* Left ear */}
      <path d="M10.5 17 L13.5 8.5 L16.5 17 Z" fill="#C9940A" />
      <path d="M12 16.5 L13.5 11 L15 16.5 Z" fill="#E8B820" opacity="0.55" />

      {/* Right ear */}
      <path d="M29.5 17 L26.5 8.5 L23.5 17 Z" fill="#C9940A" />
      <path d="M28 16.5 L26.5 11 L25 16.5 Z" fill="#E8B820" opacity="0.55" />

      {/* Face */}
      <ellipse cx="20" cy="24" rx="8.5" ry="7.5" fill="#1C1610" stroke="#C9940A" strokeWidth="0.9" />

      {/* Eyes */}
      <ellipse cx="16.8" cy="22" rx="2" ry="2.5" fill="#C9940A" />
      <ellipse cx="23.2" cy="22" rx="2" ry="2.5" fill="#C9940A" />
      <ellipse cx="16.8" cy="22.3" rx="1" ry="1.2" fill="#0D0B08" />
      <ellipse cx="23.2" cy="22.3" rx="1" ry="1.2" fill="#0D0B08" />
      <circle cx="17.1" cy="21.7" r="0.4" fill="#E8B820" opacity="0.6" />
      <circle cx="23.5" cy="21.7" r="0.4" fill="#E8B820" opacity="0.6" />

      {/* Nose */}
      <path d="M19 25.5 L20 24.5 L21 25.5 L20 26.5 Z" fill="#C9940A" />

      {/* Whiskers */}
      <line x1="11.5" y1="25.5" x2="16.5" y2="25"   stroke="#C9940A" strokeWidth="0.7" opacity="0.6" />
      <line x1="11.5" y1="27"   x2="16.5" y2="26.5" stroke="#C9940A" strokeWidth="0.7" opacity="0.6" />
      <line x1="28.5" y1="25.5" x2="23.5" y2="25"   stroke="#C9940A" strokeWidth="0.7" opacity="0.6" />
      <line x1="28.5" y1="27"   x2="23.5" y2="26.5" stroke="#C9940A" strokeWidth="0.7" opacity="0.6" />

      {/* Forehead stripe */}
      <line x1="20" y1="16.5" x2="20" y2="19.5" stroke="#E8B820" strokeWidth="1.2" opacity="0.7" />
      <line x1="17.5" y1="17.5" x2="20" y2="19.5" stroke="#E8B820" strokeWidth="0.8" opacity="0.4" />
      <line x1="22.5" y1="17.5" x2="20" y2="19.5" stroke="#E8B820" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}
