// web-marketing.jsx — Landing, Login, Signup. On window.
const { useState: useStateM } = React;

const noopM = () => {};

// A framed, scaled-down live screenshot of a real app screen.
function Shot({ w, h, scale, frameStyle, children }) {
  const innerW = Math.round(w / scale);
  const innerH = Math.round(h / scale);
  return (
    <div style={{
      width: w, borderRadius: 13, overflow: 'hidden', background: '#fff',
      border: '1px solid rgba(17,24,39,.08)',
      boxShadow: '0 36px 64px -28px rgba(17,24,39,.42), 0 10px 26px -12px rgba(17,24,39,.18)',
      ...frameStyle,
    }}>
      {/* browser chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 11px', background: '#fff', borderBottom: '1px solid var(--line-soft)' }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <span key={c} style={{ width: 8, height: 8, borderRadius: 99, background: c }} />)}
        <div style={{ flex: 1, height: 13, borderRadius: 5, background: 'var(--bg)', marginLeft: 6 }} />
      </div>
      <div style={{ width: w, height: h, overflow: 'hidden', position: 'relative' }}>
        <div style={{ width: innerW, height: innerH, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function HeroCollage() {
  const SidebarC = window.Sidebar, DashboardC = window.Dashboard, BoardC = window.ContentBoard, AIC = window.AIStudio;
  const appWrap = (child, w, h) => (
    <div style={{ width: w, height: h, display: 'flex', flexDirection: 'row', background: 'var(--bg)' }}>{child}</div>
  );
  return (
    <div style={{ position: 'relative', height: 470, pointerEvents: 'none', userSelect: 'none' }} aria-hidden="true">
      {/* soft glow behind */}
      <div style={{ position: 'absolute', inset: '8% 4% 14% 6%', borderRadius: 32, background: 'radial-gradient(60% 60% at 60% 30%, rgba(124,58,237,.16), rgba(124,58,237,0) 70%)', filter: 'blur(8px)' }} />

      {/* MAIN — Dashboard with sidebar */}
      <div style={{ position: 'absolute', top: 38, left: 0, zIndex: 1, transform: 'rotate(-1.2deg)' }}>
        <Shot w={520} h={342} scale={0.45}>
          {appWrap(
            <React.Fragment>
              <SidebarC active="dashboard" onNav={noopM} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
                <DashboardC go={noopM} openModal={noopM} />
              </div>
            </React.Fragment>,
            Math.round(520 / 0.45), Math.round(342 / 0.45)
          )}
        </Shot>
      </div>

      {/* FRONT-LEFT — Content Board (kanban) */}
      <div style={{ position: 'absolute', bottom: 4, left: -26, zIndex: 3, transform: 'rotate(-3deg)' }}>
        <Shot w={312} h={206} scale={0.30}>
          <div style={{ width: Math.round(312 / 0.30), height: Math.round(206 / 0.30), display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
            <BoardC openModal={noopM} />
          </div>
        </Shot>
      </div>

      {/* FRONT-RIGHT — AI Studio */}
      <div style={{ position: 'absolute', top: -4, right: -14, zIndex: 4, transform: 'rotate(2.6deg)' }}>
        <Shot w={304} h={216} scale={0.305}>
          <div style={{ width: Math.round(304 / 0.305), height: Math.round(216 / 0.305), display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
            <AIC />
          </div>
        </Shot>
      </div>
    </div>
  );
}

function Landing({ go }) {
  const features = [
    { t: 'Content Pipeline', d: 'Trace ideas to published content in one place' },
    { t: 'AI Assistant',     d: 'Generate captions, ideas, emails & more' },
    { t: 'Built for Creators', d: 'Simple, fast and focused on what matters' },
    { t: 'All in One Place', d: 'Everything you need in a single workspace' },
  ];
  return (
    <div style={{ minHeight: '100%', background: 'radial-gradient(65% 52% at 12% 2%, rgba(234,88,12,.07), rgba(234,88,12,0) 60%), linear-gradient(180deg, #FFF8F3 0%, #FFFFFF 560px)' }}>
      {/* navbar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 48px', maxWidth: 1240, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LogoMark size={28} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Crevia</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {['About'].map(l => (
            <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--ink-700)', fontWeight: 600, fontSize: 15, textDecoration: 'none', textUnderlineOffset: 5, transition: 'color .15s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-600)'; e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-700)'; e.currentTarget.style.textDecoration = 'none'; }}>{l}</a>
          ))}
          <a href="#" onClick={(e) => { e.preventDefault(); go('login'); }} style={{ color: 'var(--ink-900)', fontWeight: 700, fontSize: 15, textDecoration: 'none', textUnderlineOffset: 5, transition: 'color .15s ease' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-600)'; e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-900)'; e.currentTarget.style.textDecoration = 'none'; }}>Login</a>
          <button className="cs-btn cs-btn--primary" onClick={() => go('signup')}>Get Started</button>
          <button className="cs-btn cs-btn--outline" onClick={() => go('dashboard')}>Demo</button>
        </nav>
      </header>

      {/* hero */}
      <section style={{
        maxWidth: 1240, margin: '0 auto', padding: '60px 48px 72px',
        display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center',
      }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 56, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Your Operating System for<br /><span style={{ color: 'var(--brand-600)' }}>Content Creation</span>
          </h1>
          <p style={{ marginTop: 22, fontSize: 18.5, lineHeight: 1.6, color: 'var(--ink-500)', maxWidth: 480 }}>
            Plan, create, and publish content 10x faster with AI by your side.
          </p>
        </div>

        {/* product collage */}
        <HeroCollage />
      </section>

      {/* feature strip */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
          {features.map((f) => (
            <div key={f.t} className="cs-card" style={{ padding: '26px 22px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-600)', marginBottom: 16 }}>
                <IconSparkle size={22} />
              </div>
              <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16.5 }}>{f.t}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--ink-500)' }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* lean footer */}
      <footer style={{ background: 'var(--ink-900)', color: '#fff' }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto', padding: '34px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, flexWrap: 'wrap',
        }}>
          {/* brand block — primary */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <LogoMark size={26} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.01em' }}>Crevia</span>
            </div>
            <p style={{ margin: '11px 0 0', fontSize: 13, color: 'rgba(255,255,255,.5)' }}>
              © {new Date().getFullYear()} · Designed &amp; developed by Prashant
            </p>
          </div>

          {/* links — secondary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {[
              { label: 'Feedback', icon: <IconChat size={16} /> },
              { label: 'GitHub', icon: <IconGithub size={16} /> },
            ].map((lnk) => (
              <a key={lnk.label} href="#" onClick={(e) => e.preventDefault()} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '9px 16px', borderRadius: 'var(--r-pill)',
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
                color: 'rgba(255,255,255,.82)', background: 'rgba(255,255,255,.07)',
                border: '1px solid rgba(255,255,255,.1)',
                transition: 'background .15s ease, color .15s ease, border-color .15s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--brand-600)'; e.currentTarget.style.borderColor = 'var(--brand-600)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = 'rgba(255,255,255,.82)'; }}>
                {lnk.icon}{lnk.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// shared two-column auth shell
function AuthShell({ heroTitle, heroSub, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100%', background: '#fff' }}>
      <div style={{
        background: 'var(--brand-600)', color: '#fff', padding: '40px 56px',
        display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: 99, background: 'rgba(255,255,255,.07)' }} />
        <div style={{ position: 'absolute', bottom: -120, left: -60, width: 280, height: 280, borderRadius: 99, background: 'rgba(255,255,255,.05)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="9" fill="#fff" /><path d="M9.4 20.8 L15.7 15.9 L22.6 10.5" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9.4" cy="20.8" r="2.3" fill="#EA580C" /><circle cx="15.7" cy="15.9" r="2.3" fill="#EA580C" /><circle cx="22.6" cy="10.5" r="2.3" fill="#EA580C" /></svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Crevia</span>
        </div>
        <div style={{ margin: 'auto 0', position: 'relative' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{heroTitle}</h2>
          <p style={{ marginTop: 16, fontSize: 17, color: 'rgba(255,255,255,.8)', fontWeight: 400 }}>{heroSub}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>{children}</div>
      </div>
    </div>
  );
}

function Login({ go }) {
  const [email, setEmail] = useStateM('');
  const [pw, setPw] = useStateM('');
  return (
    <AuthShell heroTitle="Welcome back, Creator." heroSub="Your content pipeline is waiting.">
      <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em' }}>Sign in to your account</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Field label="Username or email"><input className="cs-input" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com or @username" /></Field>
        <Field label="Password"><PasswordInput value={pw} onChange={setPw} placeholder="••••••••" /></Field>
        <button className="cs-btn cs-btn--primary" style={{ width: '100%', padding: '13px', fontSize: 15, marginTop: 4 }} onClick={() => go('dashboard')}>Login</button>
      </div>
      <p style={{ marginTop: 22, textAlign: 'center', fontSize: 14, color: 'var(--ink-500)' }}>
        Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); go('signup'); }} style={{ color: 'var(--brand-600)', fontWeight: 600, textDecoration: 'none' }}>Sign up</a>
      </p>
    </AuthShell>
  );
}

function Signup({ go }) {
  const [fullName, setFullName] = useStateM('');
  const [name, setName] = useStateM('');
  const [email, setEmail] = useStateM('');
  const [pw, setPw] = useStateM('');
  return (
    <AuthShell heroTitle="Start creating smarter." heroSub="Set up your account in seconds.">
      <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em' }}>Create your account</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Field label="Name"><input className="cs-input" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your name" /></Field>
        <Field label="Username"><input className="cs-input" value={name} onChange={e => setName(e.target.value)} placeholder="Your username" /></Field>
        <Field label="Email address"><input className="cs-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" /></Field>
        <Field label="Password"><PasswordInput value={pw} onChange={setPw} placeholder="••••••••" /></Field>
        <button className="cs-btn cs-btn--primary" style={{ width: '100%', padding: '13px', fontSize: 15, marginTop: 4 }} onClick={() => go('dashboard')}>Create Account</button>
      </div>
      <p style={{ marginTop: 22, textAlign: 'center', fontSize: 14, color: 'var(--ink-500)' }}>
        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); go('login'); }} style={{ color: 'var(--brand-600)', fontWeight: 600, textDecoration: 'none' }}>Login</a>
      </p>
    </AuthShell>
  );
}

// ── Error screens (full-bleed, brand-consistent) ───────────────
function ErrorShell({ go, children }) {
  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: 'radial-gradient(58% 46% at 50% 8%, rgba(234,88,12,.07), rgba(234,88,12,0) 62%), #fff' }}>
      <header style={{ maxWidth: 1240, width: '100%', margin: '0 auto', padding: '22px 48px' }}>
        <button onClick={() => go('landing')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none' }}>
          <LogoMark size={28} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Crevia</span>
        </button>
      </header>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px 80px' }}>
        <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>{children}</div>
      </div>
    </div>
  );
}

function NotFound({ go }) {
  return (
    <ErrorShell go={go}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 150, lineHeight: 0.95, letterSpacing: '-0.05em', color: 'var(--brand-600)' }}>404</div>
      <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, letterSpacing: '-0.02em' }}>Page not found</h1>
      <p style={{ margin: '14px auto 0', maxWidth: 400, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-500)' }}>
        The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
        <button className="cs-btn cs-btn--primary" style={{ padding: '13px 24px', fontSize: 15 }} onClick={() => go('dashboard')}>Back to Dashboard</button>
        <button className="cs-btn cs-btn--ghost" style={{ padding: '13px 24px', fontSize: 15 }} onClick={() => go('landing')}>Go to Home</button>
      </div>
    </ErrorShell>
  );
}

function ServiceError({ go }) {
  const [retrying, setRetrying] = useStateM(false);
  const retry = () => { setRetrying(true); setTimeout(() => setRetrying(false), 1400); };
  return (
    <ErrorShell go={go}>
      <div style={{ width: 88, height: 88, margin: '0 auto', borderRadius: 24, background: 'var(--brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-600)' }}>
        <IconAlert size={42} />
      </div>
      <div style={{ marginTop: 22, fontSize: 12.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>Error 500</div>
      <h1 style={{ margin: '8px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, letterSpacing: '-0.02em' }}>Something went wrong</h1>
      <p style={{ margin: '14px auto 0', maxWidth: 410, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-500)' }}>
        We couldn't reach our servers. This one's on us — please try again in a moment.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
        <button className="cs-btn cs-btn--primary" style={{ padding: '13px 24px', fontSize: 15 }} onClick={retry}>
          <IconRefresh size={17} style={{ animation: retrying ? 'cs-spin 0.8s linear infinite' : 'none' }} />
          {retrying ? 'Retrying…' : 'Try Again'}
        </button>
        <button className="cs-btn cs-btn--ghost" style={{ padding: '13px 24px', fontSize: 15 }} onClick={() => go('dashboard')}>Back to Dashboard</button>
      </div>
      <p style={{ margin: '26px 0 0', fontSize: 13.5, color: 'var(--ink-400)' }}>
        Still stuck? <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--brand-600)', fontWeight: 600, textDecoration: 'none' }}>Contact support</a>
      </p>
    </ErrorShell>
  );
}

Object.assign(window, { Landing, Login, Signup, NotFound, ServiceError });
