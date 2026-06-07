// web-shared.jsx — Sidebar, shell helpers, shared UI. On window.
const { useState, useRef, useEffect } = React;

// copy-to-clipboard hook returning [copiedKey, copy(key, text)]
function useCopy() {
  const [copied, setCopied] = useState(null);
  const t = useRef(null);
  const copy = (key, text) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    } catch (e) {}
    setCopied(key);
    clearTimeout(t.current);
    t.current = setTimeout(() => setCopied(null), 1600);
  };
  return [copied, copy];
}

function PlatformPill({ platform }) {
  const p = PLATFORM[platform] || PLATFORM.Blog;
  return (
    <span className={`cs-pill ${p.cls}`}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: p.color }} />
      {platform}
    </span>
  );
}

function Sidebar({ active, onNav }) {
  const D = CS_DATA;
  return (
    <aside style={{
      width: 248, flexShrink: 0, background: '#fff', borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column', height: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '22px 22px 18px' }}>
        <LogoMark size={30} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16.5, letterSpacing: '-0.01em' }}>
          Crevia
        </span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '6px 14px', flex: 1 }}>
        {D.nav.map((item) => {
          const Icon = window[item.icon];
          const on = active === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '10px 12px', borderRadius: 'var(--r-md)', textAlign: 'left',
              fontFamily: 'var(--font-body)', fontWeight: on ? 600 : 500, fontSize: 14.5,
              color: on ? 'var(--brand-700)' : 'var(--ink-500)',
              background: on ? 'var(--brand-50)' : 'transparent',
              transition: 'background .14s, color .14s',
            }}
              onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = 'var(--bg)'; }}
              onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
              <Icon size={19} style={{ color: on ? 'var(--brand-600)' : 'var(--ink-400)' }} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ borderTop: '1px solid var(--line-soft)', padding: '12px 14px 14px' }}>
        <button onClick={() => onNav('login')} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%',
          padding: '11px 14px', borderRadius: 'var(--r-md)', border: '1px solid var(--line)',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
          color: 'var(--ink-700)', background: '#fff', transition: 'background .15s, color .15s, border-color .15s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#DC2626'; e.currentTarget.style.borderColor = '#FECACA'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--ink-700)'; e.currentTarget.style.borderColor = 'var(--line)'; }}>
          <IconLogout size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}

function Avatar({ name, size = 38 }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('');
  return (
    <div style={{
      width: size, height: size, borderRadius: 99, flexShrink: 0,
      background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.36,
      fontFamily: 'var(--font-display)',
    }}>{initials}</div>
  );
}

// top bar used across app screens
function TopBar({ title, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 32px', borderBottom: '1px solid var(--line)', background: '#fff',
    }}>
      <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>{children}</div>
    </div>
  );
}

// labeled select with custom chevron
function Field({ label, children }) {
  return (
    <div>
      <label className="cs-field-label">{label}</label>
      {children}
    </div>
  );
}

function Select({ value, options, onChange }) {
  return (
    <div style={{ position: 'relative' }}>
      <select className="cs-input" value={value} onChange={(e) => onChange && onChange(e.target.value)}
        style={{ appearance: 'none', WebkitAppearance: 'none', paddingRight: 38, cursor: 'pointer' }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <IconChevDown size={18} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-400)', pointerEvents: 'none' }} />
    </div>
  );
}

function PasswordInput({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <input className="cs-input" type={show ? 'text' : 'password'} value={value}
        placeholder={placeholder} onChange={(e) => onChange && onChange(e.target.value)}
        style={{ paddingRight: 44 }} />
      <button type="button" onClick={() => setShow(s => !s)} aria-label="toggle"
        style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', padding: 8, color: 'var(--ink-400)', display: 'flex' }}>
        {show ? <IconEyeOff size={18} /> : <IconEye size={18} />}
      </button>
    </div>
  );
}

// copy-icon button: shows check on success
function CopyRow({ k, copied, onCopy }) {
  const on = copied === k;
  return (
    <button onClick={onCopy} aria-label="copy" style={{ width: 30, height: 30, borderRadius: 8, color: on ? 'var(--green-600)' : 'var(--ink-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      onMouseEnter={e => { if (!on) e.currentTarget.style.background = 'var(--bg)'; }}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      {on ? <IconCheck size={16} /> : <IconCopy size={16} />}
    </button>
  );
}

Object.assign(window, { useCopy, PlatformPill, Sidebar, Avatar, TopBar, Field, Select, PasswordInput, CopyRow });
