import React from "react";

interface FlagProps {
  className?: string;
}

export function FlagUSA({ className = "w-6 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="USA Flag">
      {/* 13 stripes */}
      <rect width="24" height="16" fill="#B22234" />
      <rect y="1.23" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="3.69" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="6.15" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="8.61" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="11.07" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="13.53" width="24" height="1.23" fill="#FFFFFF" />
      {/* Canton */}
      <rect width="9.6" height="8.61" fill="#3C3B6E" />
      {/* Star dots */}
      <circle cx="1.6" cy="1.4" r="0.45" fill="#FFFFFF" />
      <circle cx="3.2" cy="1.4" r="0.45" fill="#FFFFFF" />
      <circle cx="4.8" cy="1.4" r="0.45" fill="#FFFFFF" />
      <circle cx="6.4" cy="1.4" r="0.45" fill="#FFFFFF" />
      <circle cx="8.0" cy="1.4" r="0.45" fill="#FFFFFF" />
      <circle cx="2.4" cy="2.8" r="0.45" fill="#FFFFFF" />
      <circle cx="4.0" cy="2.8" r="0.45" fill="#FFFFFF" />
      <circle cx="5.6" cy="2.8" r="0.45" fill="#FFFFFF" />
      <circle cx="7.2" cy="2.8" r="0.45" fill="#FFFFFF" />
      <circle cx="1.6" cy="4.3" r="0.45" fill="#FFFFFF" />
      <circle cx="3.2" cy="4.3" r="0.45" fill="#FFFFFF" />
      <circle cx="4.8" cy="4.3" r="0.45" fill="#FFFFFF" />
      <circle cx="6.4" cy="4.3" r="0.45" fill="#FFFFFF" />
      <circle cx="8.0" cy="4.3" r="0.45" fill="#FFFFFF" />
      <circle cx="2.4" cy="5.7" r="0.45" fill="#FFFFFF" />
      <circle cx="4.0" cy="5.7" r="0.45" fill="#FFFFFF" />
      <circle cx="5.6" cy="5.7" r="0.45" fill="#FFFFFF" />
      <circle cx="7.2" cy="5.7" r="0.45" fill="#FFFFFF" />
      <circle cx="1.6" cy="7.1" r="0.45" fill="#FFFFFF" />
      <circle cx="3.2" cy="7.1" r="0.45" fill="#FFFFFF" />
      <circle cx="4.8" cy="7.1" r="0.45" fill="#FFFFFF" />
      <circle cx="6.4" cy="7.1" r="0.45" fill="#FFFFFF" />
      <circle cx="8.0" cy="7.1" r="0.45" fill="#FFFFFF" />
    </svg>
  );
}

export function FlagCanada({ className = "w-6 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Canada Flag">
      <rect width="6" height="16" fill="#D80027" />
      <rect x="6" width="12" height="16" fill="#FFFFFF" />
      <rect x="18" width="6" height="16" fill="#D80027" />
      {/* Maple Leaf */}
      <path
        d="M12 2.8L12.8 4.8L14.4 4.3L14 6L15.9 6.6L14.7 8.1L15.6 9.3L13.6 9L12.5 11.2L12 10.4L11.5 11.2L10.4 9L8.4 9.3L9.3 8.1L8.1 6.6L10 6L9.6 4.3L11.2 4.8L12 2.8Z"
        fill="#D80027"
      />
      <rect x="11.5" y="10.8" width="1" height="2.2" fill="#D80027" />
    </svg>
  );
}

export function FlagIndia({ className = "w-6 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="India Flag">
      <rect width="24" height="5.33" fill="#FF9933" />
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
      <rect y="10.67" width="24" height="5.33" fill="#138808" />
      {/* Ashoka Chakra */}
      <circle cx="12" cy="8" r="2.2" stroke="#000080" strokeWidth="0.5" fill="none" />
      <circle cx="12" cy="8" r="0.5" fill="#000080" />
      <line x1="12" y1="5.8" x2="12" y2="10.2" stroke="#000080" strokeWidth="0.3" />
      <line x1="9.8" y1="8" x2="14.2" y2="8" stroke="#000080" strokeWidth="0.3" />
      <line x1="10.4" y1="6.4" x2="13.6" y2="9.6" stroke="#000080" strokeWidth="0.3" />
      <line x1="10.4" y1="9.6" x2="13.6" y2="6.4" stroke="#000080" strokeWidth="0.3" />
    </svg>
  );
}

export function FlagUAE({ className = "w-6 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="UAE Flag">
      <rect x="6" width="18" height="5.33" fill="#00732F" />
      <rect x="6" y="5.33" width="18" height="5.34" fill="#FFFFFF" />
      <rect x="6" y="10.67" width="18" height="5.33" fill="#000000" />
      <rect width="6" height="16" fill="#FF0000" />
    </svg>
  );
}

export function FlagSaudi({ className = "w-6 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Saudi Arabia Flag">
      <rect width="24" height="16" fill="#006C35" />
      {/* Stylized Arabic Calligraphy */}
      <path
        d="M5 6.2C6.2 5.5 7.8 6.2 9 5.5C10.2 6.2 11.8 5.5 13 6.2C14.2 5.5 15.8 6.2 17 5.5C18.2 6.2 19 5.8 19.5 6.5"
        stroke="#FFFFFF"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M6 7.8C7.5 7.2 9.5 8 11 7.3C12.5 8 14.5 7.2 16 7.8C17 7.3 18 7.8 18.5 7.2"
        stroke="#FFFFFF"
        strokeWidth="0.65"
        strokeLinecap="round"
      />
      {/* Sword */}
      <line x1="6.5" y1="9.8" x2="17.5" y2="9.8" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M6.5 9.8L7.5 8.8M6.5 9.8L7.5 10.8" stroke="#FFFFFF" strokeWidth="0.7" strokeLinecap="round" />
      <line x1="16.5" y1="8.8" x2="16.5" y2="10.8" stroke="#FFFFFF" strokeWidth="0.8" />
    </svg>
  );
}

export function FlagKuwait({ className = "w-6 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Kuwait Flag">
      <rect width="24" height="5.33" fill="#007A3D" />
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
      <rect y="10.67" width="24" height="5.33" fill="#CE1126" />
      {/* Black trapezoid */}
      <polygon points="0,0 7,5.33 7,10.67 0,16" fill="#000000" />
    </svg>
  );
}

export function FlagSingapore({ className = "w-6 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Singapore Flag">
      <rect width="24" height="8" fill="#ED2939" />
      <rect y="8" width="24" height="8" fill="#FFFFFF" />
      {/* Crescent */}
      <path
        d="M5 2.5C6.3 3.4 6.3 5.6 5 6.5C4.2 5.7 4.2 3.3 5 2.5Z"
        fill="#FFFFFF"
      />
      {/* 5 stars */}
      <circle cx="6.8" cy="3.3" r="0.4" fill="#FFFFFF" />
      <circle cx="7.7" cy="4" r="0.4" fill="#FFFFFF" />
      <circle cx="7.4" cy="5" r="0.4" fill="#FFFFFF" />
      <circle cx="6.2" cy="5" r="0.4" fill="#FFFFFF" />
      <circle cx="5.9" cy="4" r="0.4" fill="#FFFFFF" />
    </svg>
  );
}

export function FlagMalaysia({ className = "w-6 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Malaysia Flag">
      {/* 14 stripes */}
      <rect width="24" height="16" fill="#CC0000" />
      <rect y="1.14" width="24" height="1.14" fill="#FFFFFF" />
      <rect y="3.42" width="24" height="1.14" fill="#FFFFFF" />
      <rect y="5.70" width="24" height="1.14" fill="#FFFFFF" />
      <rect y="7.98" width="24" height="1.14" fill="#FFFFFF" />
      <rect y="10.26" width="24" height="1.14" fill="#FFFFFF" />
      <rect y="12.54" width="24" height="1.14" fill="#FFFFFF" />
      <rect y="14.82" width="24" height="1.14" fill="#FFFFFF" />
      {/* Blue Canton */}
      <rect width="11" height="9.12" fill="#010066" />
      {/* Yellow Crescent and Star */}
      <path
        d="M4.3 2.5C5.8 3.6 5.8 6.4 4.3 7.5C3.3 6.5 3.3 3.5 4.3 2.5Z"
        fill="#FFCC00"
      />
      <polygon
        points="6.8,3.7 7.2,4.5 8.1,4.6 7.4,5.2 7.7,6.1 6.8,5.5 6,6.1 6.2,5.2 5.6,4.6 6.5,4.5"
        fill="#FFCC00"
      />
    </svg>
  );
}

export function CountryFlag({ code, className = "w-6 h-4" }: { code: string; className?: string }) {
  switch (code.toLowerCase()) {
    case "us":
    case "usa":
      return <FlagUSA className={className} />;
    case "ca":
    case "can":
      return <FlagCanada className={className} />;
    case "in":
    case "ind":
      return <FlagIndia className={className} />;
    case "ae":
    case "uae":
      return <FlagUAE className={className} />;
    case "sa":
    case "sau":
      return <FlagSaudi className={className} />;
    case "kw":
    case "kwt":
      return <FlagKuwait className={className} />;
    case "sg":
    case "sgp":
      return <FlagSingapore className={className} />;
    case "my":
    case "mys":
      return <FlagMalaysia className={className} />;
    default:
      return null;
  }
}
