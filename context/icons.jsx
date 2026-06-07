// icons.jsx — Crevia icon set (stroke-based, 1.75 weight)
// Exposed on window for cross-file use.
const I = ({ d, size = 20, sw = 1.75, fill = 'none', children, vb = 24, style }) => (
  <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill={fill}
       stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
       style={style}>
    {d ? <path d={d} /> : children}
  </svg>
);

// Brand mark — tangerine rounded square with white "pipeline" (idea → published)
const LogoMark = ({ size = 30, radius = 9 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <rect width="32" height="32" rx={radius} style={{ fill: 'var(--brand-600)' }} />
    <path d="M9.4 20.8 L15.7 15.9 L22.6 10.5" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9.4" cy="20.8" r="2.3" fill="#fff" />
    <circle cx="15.7" cy="15.9" r="2.3" fill="#fff" />
    <circle cx="22.6" cy="10.5" r="2.3" fill="#fff" />
  </svg>
);

const IconPlay      = (p) => <I {...p}><path d="M8 5.5l11 6.5-11 6.5z" fill="currentColor" stroke="none"/></I>;
const IconDashboard = (p) => <I {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></I>;
const IconBoard     = (p) => <I {...p}><rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="9.5" y="4" width="5" height="11" rx="1.5"/><rect x="16" y="4" width="5" height="13" rx="1.5"/></I>;
const IconAI        = (p) => <I {...p}><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/></I>;
const IconSettings  = (p) => <I {...p}><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5v.2a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1h.2a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></I>;
const IconBell      = (p) => <I {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></I>;
const IconPlus      = (p) => <I {...p}><path d="M12 5v14M5 12h14"/></I>;
const IconSparkle   = (p) => <I {...p}><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z"/></I>;
const IconCopy      = (p) => <I {...p}><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></I>;
const IconCheck     = (p) => <I {...p}><path d="M20 6L9 17l-5-5"/></I>;
const IconEye       = (p) => <I {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></I>;
const IconEyeOff    = (p) => <I {...p}><path d="M9.9 4.2A10.9 10.9 0 0 1 12 4c6.5 0 10 7 10 7a18 18 0 0 1-3 4M6.6 6.6A18 18 0 0 0 2 11s3.5 7 10 7a10.9 10.9 0 0 0 4-.7"/><path d="M3 3l18 18M9.5 9.6a3 3 0 0 0 4.2 4.2"/></I>;
const IconArrowUp   = (p) => <I {...p}><path d="M12 19V5M6 11l6-6 6 6"/></I>;
const IconArrowRight= (p) => <I {...p}><path d="M5 12h14M13 6l6 6-6 6"/></I>;
const IconClose     = (p) => <I {...p}><path d="M6 6l12 12M18 6L6 18"/></I>;
const IconChevDown  = (p) => <I {...p}><path d="M6 9l6 6 6-6"/></I>;
const IconCalendar  = (p) => <I {...p}><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></I>;
const IconLogout    = (p) => <I {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></I>;
const IconHistory   = (p) => <I {...p}><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/><path d="M12 8v4l3 1.8"/></I>;
const IconChat      = (p) => <I {...p}><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 9.4 9.4 0 0 1-4-.9L3 21l1.9-5.5A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 21 11.5z"/></I>;
const IconGithub    = ({ size = 18, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.4 9.4 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
  </svg>
);
const IconAlert     = (p) => <I {...p}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></I>;
const IconRefresh   = (p) => <I {...p}><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v5h-5"/></I>;
const IconCompass   = (p) => <I {...p}><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></I>;

Object.assign(window, {
  LogoMark, IconPlay, IconDashboard, IconBoard, IconAI, IconSettings, IconBell,
  IconPlus, IconSparkle, IconCopy, IconCheck, IconEye, IconEyeOff, IconArrowUp,
  IconArrowRight, IconClose, IconChevDown, IconCalendar, IconLogout, IconHistory,
  IconChat, IconGithub, IconAlert, IconRefresh, IconCompass,
});
