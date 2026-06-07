// mobile-app.jsx — Crevia mobile screens (inside iOS bezel). On window.
const { useState: useMS } = React;

const TOP_SAFE = 58;   // status bar + island clearance
const BOT_SAFE = 90;   // tab bar + home indicator

// ── shared chrome ──────────────────────────────────────────────
function MHeader({ title, sub, right }) {
  return (
    <div style={{ padding: `${TOP_SAFE}px 20px 14px`, background: '#fff', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em' }}>{title}</h1>
        {right}
      </div>
      {sub && <p style={{ margin: '4px 0 0', color: 'var(--ink-500)', fontSize: 14 }}>{sub}</p>}
    </div>
  );
}

function MTabBar({ active, onNav }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      paddingBottom: 28, paddingTop: 8, background: 'rgba(255,255,255,.92)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-around',
    }}>
      {CS_DATA.nav.map(item => {
        const Icon = window[item.icon];
        const on = active === item.id;
        const short = item.id === 'board' ? 'Board' : item.label;
        return (
          <button key={item.id} onClick={() => onNav(item.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: on ? 'var(--brand-600)' : 'var(--ink-400)', flex: 1,
          }}>
            <Icon size={23} />
            <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500 }}>{short}</span>
          </button>
        );
      })}
    </div>
  );
}

function MScroll({ children, pad = 20 }) {
  return <div style={{ height: '100%', overflow: 'auto', padding: `18px ${pad}px ${BOT_SAFE}px` }}>{children}</div>;
}

function MAvatar() {
  return <Avatar name={CS_DATA.user.name} size={36} />;
}

// ── Dashboard ──────────────────────────────────────────────────
function MDeadlinesEmpty() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '28px 16px 22px' }}>
      <div style={{ width: 54, height: 54, borderRadius: 16, background: 'var(--brand-50)', color: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconCheck size={26} />
      </div>
      <h4 style={{ margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15.5, letterSpacing: '-0.01em', color: 'var(--ink-900)' }}>No deadlines</h4>
      <p style={{ margin: '5px 0 0', fontSize: 13.5, color: 'var(--ink-500)', whiteSpace: 'nowrap' }}>You're all set.</p>
    </div>
  );
}

function MDashboard({ go, openModal, deadlines }) {
  const D = CS_DATA;
  const list = deadlines || D.deadlines;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MHeader title="Dashboard" right={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MAvatar />
        </div>} />
      <MScroll>
        <h2 style={{ margin: '0 0 2px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, letterSpacing: '-0.02em' }}>Good morning, Prashant 👋</h2>
        <p style={{ margin: '0 0 18px', color: 'var(--ink-500)', fontSize: 13.5 }}>Here's what's happening with your content today.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          {D.stats.map((s, i) => (
            <div key={s.label} className="cs-card" style={{ padding: '16px' }}>
              <div style={{ fontSize: 12.5, color: 'var(--ink-500)', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, lineHeight: 1, marginTop: 10, letterSpacing: '-0.02em', color: i === 0 ? 'var(--brand-600)' : 'var(--ink-900)' }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="cs-card" style={{ padding: '18px 18px', marginBottom: 16 }}>
          <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>Upcoming Deadlines</h3>
          {list.length === 0 ? <MDeadlinesEmpty /> : (
            <React.Fragment>
              {list.map((d, i) => (
                <div key={i} style={{ padding: '12px 0', borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{d.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <PlatformPill platform={d.platform} />
                    <span style={{ fontSize: 12.5, color: 'var(--ink-500)', fontWeight: 600 }}>{d.date}</span>
                  </div>
                </div>
              ))}
              <button onClick={() => go('board')} style={{ marginTop: 10, color: 'var(--brand-600)', fontWeight: 600, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                View all deadlines <IconArrowRight size={14} />
              </button>
            </React.Fragment>
          )}
        </div>
      </MScroll>
    </div>
  );
}

// ── Content Board (horizontal snap columns) ────────────────────
function MBoard({ openModal }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MHeader title="Content Board" sub="Drag and move your content across the pipeline." right={
        <button onClick={openModal} style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--brand-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-brand)' }}><IconPlus size={20} /></button>} />
      <div style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', display: 'flex', gap: 14, padding: `16px 20px ${BOT_SAFE}px`, scrollSnapType: 'x mandatory' }}>
        {CS_DATA.board.map(col => (
          <div key={col.name} style={{ width: 268, flexShrink: 0, scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 2px 12px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14.5, color: 'var(--ink-700)' }}>{col.name}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, overflow: 'auto' }}>
              {col.cards.map((c, i) => (
                <div key={i} className="cs-card" style={{ padding: '14px 15px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.35, marginBottom: 11, textWrap: 'pretty' }}>{c.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <PlatformPill platform={c.platform} />
                    <span style={{ fontSize: 11.5, color: 'var(--ink-400)', fontWeight: 600 }}>{c.date}</span>
                  </div>
                </div>
              ))}
              <button style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 'var(--r-md)', color: 'var(--ink-400)', fontWeight: 600, fontSize: 13, border: '1.5px dashed var(--line)' }}>+ Add Card</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Content Modal (bottom sheet) ───────────────────────────────
function MModal({ onClose }) {
  const D = CS_DATA;
  const [stage, setStage] = useMS('Ideas');
  const [platform, setPlatform] = useMS('YouTube');
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 100, background: 'rgba(17,24,39,.5)', display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxHeight: '92%', overflow: 'auto', background: '#fff', borderRadius: '24px 24px 0 0', paddingBottom: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}><div style={{ width: 38, height: 4, borderRadius: 99, background: 'var(--line)' }} /></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 16px', borderBottom: '1px solid var(--line-soft)' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.02em' }}>Add New Content</h2>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9, color: 'var(--ink-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconClose size={18} /></button>
        </div>
        <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="Title"><input className="cs-input" placeholder="What's your content about?" /></Field>
          <Field label="Description"><textarea className="cs-input" rows={3} placeholder="Add notes, ideas, or details about this content..." style={{ resize: 'none', lineHeight: 1.5 }} /></Field>
          <Field label="Platform"><Select value={platform} options={D.platforms} onChange={setPlatform} /></Field>
          <Field label="Due Date"><input className="cs-input" type="date" /></Field>
          <Field label="Stage">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {D.stages.map(s => {
                const on = stage === s;
                return <button key={s} onClick={() => setStage(s)} style={{ padding: '10px 0', borderRadius: 'var(--r-pill)', fontWeight: 600, fontSize: 13, background: on ? 'var(--brand-600)' : 'var(--brand-50)', color: on ? '#fff' : 'var(--brand-700)' }}>{s}</button>;
              })}
            </div>
          </Field>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button className="cs-btn cs-btn--ghost" style={{ flex: 1, padding: '12px' }} onClick={onClose}>Cancel</button>
            <button className="cs-btn cs-btn--primary" style={{ flex: 1, padding: '12px' }} onClick={onClose}>Save Content</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AI Studio ──────────────────────────────────────────────────
function MAIStudio({ initialTab } = {}) {
  const [tab, setTab] = useMS(initialTab || 'caption');
  const D = CS_DATA;
  const [copied, copy] = useCopy();
  const tabs = [{ id: 'caption', label: 'Caption' }, { id: 'idea', label: 'Content Idea' }, { id: 'email', label: 'Sponsor Email' }, { id: 'history', label: 'History' }];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MHeader title="AI Studio" sub="Use AI to supercharge your content creation." />
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--line)', background: '#fff', overflowX: 'auto' }}>
        {tabs.map(t => {
          const on = tab === t.id;
          return <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '7px 14px', borderRadius: 99, fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', background: on ? 'var(--brand-600)' : 'var(--bg)', color: on ? '#fff' : 'var(--ink-500)' }}>{t.label}</button>;
        })}
      </div>
      <MScroll pad={20}>
        {tab === 'caption' && <>
          <div className="cs-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 16 }}>
            <Field label="Topic / What's your post about?"><textarea className="cs-input" rows={2} defaultValue="5 AI tools that every creator should try" style={{ resize: 'none', lineHeight: 1.5 }} /></Field>
            <Field label="Platform"><Select value="Instagram" options={D.platforms} /></Field>
            <Field label="Tone"><Select value="Casual" options={['Casual', 'Professional', 'Friendly', 'Bold']} /></Field>
            <button className="cs-btn cs-btn--primary" style={{ width: '100%', padding: '12px' }}><IconSparkle size={16} /> Generate Captions</button>
          </div>
          <MOutput title="Generated Captions" onCopyAll={() => copy('all', D.captions.join('\n\n'))} copiedAll={copied === 'all'}>
            {D.captions.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '14px 0', borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
                <p style={{ margin: 0, flex: 1, fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-700)', whiteSpace: 'pre-line' }}>{c}</p>
                <CopyRow k={i} copied={copied} onCopy={() => copy(i, c)} />
              </div>
            ))}
          </MOutput>
        </>}
        {tab === 'idea' && <>
          <div className="cs-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 16 }}>
            <Field label="Your Niche / Topic"><textarea className="cs-input" rows={2} defaultValue="YouTube tips for beginner creators" style={{ resize: 'none', lineHeight: 1.5 }} /></Field>
            <button className="cs-btn cs-btn--primary" style={{ width: '100%', padding: '12px' }}><IconSparkle size={16} /> Generate Ideas</button>
          </div>
          <MOutput title="Generated Content Ideas" onCopyAll={() => copy('all', D.ideas.map((x, i) => `${i + 1}. ${x}`).join('\n'))} copiedAll={copied === 'all'}>
            {D.ideas.map((idea, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 0', borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
                <span style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: 'var(--brand-50)', color: 'var(--brand-700)', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)' }}>{i + 1}</span>
                <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, lineHeight: 1.4 }}>{idea}</span>
                <CopyRow k={i} copied={copied} onCopy={() => copy(i, idea)} />
              </div>
            ))}
          </MOutput>
        </>}
        {tab === 'email' && <>
          <div className="cs-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 16 }}>
            <Field label="Sponsor / Brand Name"><input className="cs-input" defaultValue="Notion" /></Field>
            <Field label="Their Product or Service"><input className="cs-input" defaultValue="Productivity and note-taking app" /></Field>
            <Field label="Your Niche"><input className="cs-input" defaultValue="YouTube creator tips and tools" /></Field>
            <Field label="Tone"><Select value="Professional" options={['Professional', 'Casual', 'Friendly', 'Bold']} /></Field>
            <button className="cs-btn cs-btn--primary" style={{ width: '100%', padding: '12px' }}><IconSparkle size={16} /> Generate Email</button>
          </div>
          <MOutput title="Generated Sponsor Email" onCopyAll={() => copy('all', D.email.subject + '\n\n' + D.email.body)} copiedAll={copied === 'all'}>
            <div style={{ padding: '12px 0 0', fontWeight: 700, fontSize: 13.5 }}>{D.email.subject}</div>
            <div style={{ borderTop: '1px solid var(--line-soft)', display: 'flex', gap: 10, marginTop: 12, paddingTop: 14 }}>
              <p style={{ margin: 0, flex: 1, fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-700)', whiteSpace: 'pre-line' }}>{D.email.body}</p>
              <CopyRow k="body" copied={copied} onCopy={() => copy('body', D.email.body)} />
            </div>
          </MOutput>
        </>}
        {tab === 'history' && <MGenerationHistory />}
      </MScroll>
    </div>
  );
}

// ── AI Studio — Generation History (mobile accordion) ──────────
const M_TOOL_META = { caption: 'Caption', idea: 'Content Idea', sponsor: 'Sponsor Email' };

function MHMeta({ label, value }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span style={{ color: 'var(--ink-400)', fontWeight: 600 }}>{label}</span>
      <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{value}</span>
    </span>
  );
}

function MGenerationHistory() {
  const D = CS_DATA;
  const [open, setOpen] = useMS(0);
  const [copied, copy] = useCopy();
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        <IconHistory size={17} style={{ color: 'var(--brand-600)' }} />
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15.5, letterSpacing: '-0.01em' }}>Generation History</h3>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink-400)', background: '#fff', border: '1px solid var(--line)', borderRadius: 99, padding: '2px 9px', whiteSpace: 'nowrap', flexShrink: 0 }}>{D.history.length} saved</span>
      </div>
      <div className="cs-card" style={{ padding: 0, overflow: 'hidden' }}>
        {D.history.map((h, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', textAlign: 'left',
                background: isOpen ? 'var(--brand-50)' : 'transparent',
              }}>
                <span style={{
                  flexShrink: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 10.5,
                  letterSpacing: '.02em', color: 'var(--brand-700)', background: 'var(--brand-100)',
                  borderRadius: 6, padding: '4px 8px',
                }}>{M_TOOL_META[h.tool]}</span>
                <span style={{ flex: 1, minWidth: 0, fontWeight: 600, fontSize: 13, color: 'var(--ink-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.prompt}</span>
                <IconChevDown size={16} style={{ flexShrink: 0, color: 'var(--ink-400)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .18s ease' }} />
              </button>
              {isOpen && (
                <div style={{ padding: '2px 16px 16px' }}>
                  <div style={{ display: 'flex', gap: 10, background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 'var(--r-md)', padding: '13px 14px' }}>
                    <p style={{ margin: 0, flex: 1, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-700)', whiteSpace: 'pre-line' }}>{h.result}</p>
                    <CopyRow k={i} copied={copied} onCopy={() => copy(i, h.result)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 11, fontSize: 11.5, flexWrap: 'wrap' }}>
                    <MHMeta label="Tone" value={h.tone} />
                    <MHMeta label="Platform" value={h.platform} />
                    <MHMeta label="Created" value={h.createdAt} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function MOutput({ title, onCopyAll, copiedAll, children }) {
  return (
    <div className="cs-card" style={{ padding: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 18px', borderBottom: '1px solid var(--line-soft)' }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15 }}>{title}</h3>
        <button className="cs-btn cs-btn--ghost" style={{ padding: '6px 11px', fontSize: 12.5 }} onClick={onCopyAll}>{copiedAll ? <IconCheck size={14} /> : <IconCopy size={14} />} {copiedAll ? 'Copied' : 'Copy All'}</button>
      </div>
      <div style={{ padding: '4px 18px 10px' }}>{children}</div>
    </div>
  );
}

// ── Settings ───────────────────────────────────────────────────
function MSettings() {
  const u = CS_DATA.user;
  const rows = [
    { label: 'Name', value: u.name },
    { label: 'Username', value: u.username },
    { label: 'Email', value: u.email },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MHeader title="Settings" right={<MAvatar />} />
      <MScroll>
        <div className="cs-card" style={{ padding: '20px', marginBottom: 16 }}>
          <h3 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>Profile Settings</h3>
          <div>
            {rows.map((r, i) => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '13px 0', borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-500)' }}>{r.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)' }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="cs-card" style={{ padding: '20px' }}>
          <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>Change Password</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Current Password"><PasswordInput placeholder="••••••••" /></Field>
            <Field label="New Password"><PasswordInput placeholder="••••••••" /></Field>
          </div>
          <button className="cs-btn cs-btn--primary" style={{ width: '100%', marginTop: 18 }}>Update Password</button>
        </div>
      </MScroll>
    </div>
  );
}

// ── Landing (marketing) ────────────────────────────────────────
function MLanding({ go }) {
  const features = [
    { t: 'Content Pipeline', d: 'Trace ideas to published content in one place' },
    { t: 'AI Assistant', d: 'Generate captions, ideas, emails & more' },
    { t: 'Built for Creators', d: 'Simple, fast and focused on what matters' },
    { t: 'All in One Place', d: 'Everything you need in a single workspace' },
  ];
  const links = [
    { label: 'Feedback', icon: <IconChat size={15} /> },
    { label: 'GitHub', icon: <IconGithub size={15} /> },
  ];
  return (
    <div style={{ height: '100%', overflow: 'auto', background: 'radial-gradient(85% 38% at 8% 0%, rgba(234,88,12,.08), rgba(234,88,12,0) 55%), linear-gradient(180deg, #FFF8F3 0%, #FFFFFF 360px)' }}>
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${TOP_SAFE}px 22px 0` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <LogoMark size={26} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Crevia</span>
        </div>
        <a href="#" onClick={(e) => { e.preventDefault(); go('login'); }} style={{ color: 'var(--ink-900)', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>Login</a>
      </div>

      {/* hero */}
      <div style={{ padding: '38px 22px 0' }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 37, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
          Your Operating System for <span style={{ color: 'var(--brand-600)' }}>Content Creation</span>
        </h1>
        <p style={{ margin: '16px 0 0', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-500)' }}>
          Plan, create, and publish content 10x faster with AI by your side.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 26 }}>
          <button className="cs-btn cs-btn--primary" style={{ padding: '14px', fontSize: 15.5, width: '100%' }} onClick={() => go('signup')}>Get Started</button>
          <button className="cs-btn cs-btn--outline" style={{ padding: '14px', fontSize: 15.5, width: '100%' }} onClick={() => go('dashboard')}>Demo</button>
        </div>
      </div>

      {/* preview mockup */}
      <div style={{ padding: '34px 22px 0' }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', background: '#1F2937', boxShadow: 'var(--sh-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 14px' }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: 99, background: c }} />)}
            <div style={{ flex: 1, height: 18, borderRadius: 5, background: '#374151', marginLeft: 6 }} />
          </div>
          <div style={{ height: 188, background: 'linear-gradient(135deg, #2A2336, #1F2937)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '86%', height: '80%', borderRadius: 9, background: 'repeating-linear-gradient(135deg, #374151 0 14px, #313a49 14px 28px)' }} />
          </div>
        </div>
      </div>

      {/* feature cards */}
      <div style={{ padding: '34px 22px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {features.map(f => (
          <div key={f.t} className="cs-card" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 12, background: 'var(--brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-600)' }}>
                <IconSparkle size={22} />
              </div>
              <div>
                <h3 style={{ margin: '0 0 3px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>{f.t}</h3>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-500)' }}>{f.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div style={{ marginTop: 38, background: 'var(--ink-900)', color: '#fff', padding: '28px 22px 42px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <LogoMark size={24} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Crevia</span>
        </div>
        <p style={{ margin: '11px 0 16px', fontSize: 12.5, color: 'rgba(255,255,255,.5)' }}>© {new Date().getFullYear()} · Designed &amp; developed by Prashant</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {links.map(l => (
            <a key={l.label} href="#" onClick={(e) => e.preventDefault()} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 15px', borderRadius: 'var(--r-pill)',
              fontSize: 13.5, fontWeight: 600, textDecoration: 'none', color: 'rgba(255,255,255,.82)',
              background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)',
            }}>{l.icon}{l.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Auth (single-column mobile) ────────────────────────────────
function MAuth({ mode, go }) {
  const isLogin = mode === 'login';
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ background: 'var(--brand-600)', color: '#fff', padding: `${TOP_SAFE + 14}px 24px 36px`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -50, width: 200, height: 200, borderRadius: 99, background: 'rgba(255,255,255,.08)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, position: 'relative' }}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="9" fill="#fff" /><path d="M9.4 20.8 L15.7 15.9 L22.6 10.5" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9.4" cy="20.8" r="2.3" fill="#EA580C" /><circle cx="15.7" cy="15.9" r="2.3" fill="#EA580C" /><circle cx="22.6" cy="10.5" r="2.3" fill="#EA580C" /></svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Crevia</span>
        </div>
        <h2 style={{ margin: '24px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 27, lineHeight: 1.12, letterSpacing: '-0.02em', position: 'relative' }}>{isLogin ? 'Welcome back, Creator.' : 'Start creating smarter.'}</h2>
        <p style={{ margin: '10px 0 0', fontSize: 14.5, color: 'rgba(255,255,255,.82)', position: 'relative' }}>{isLogin ? 'Your content pipeline is waiting.' : 'Set up your account in seconds.'}</p>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '28px 24px' }}>
        <h3 style={{ margin: '0 0 20px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, letterSpacing: '-0.02em' }}>{isLogin ? 'Sign in to your account' : 'Create your account'}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {!isLogin && <Field label="Name"><input className="cs-input" placeholder="Your name" /></Field>}
          {!isLogin && <Field label="Username"><input className="cs-input" placeholder="Your username" /></Field>}
          <Field label={isLogin ? 'Username or email' : 'Email address'}><input className="cs-input" type={isLogin ? 'text' : 'email'} placeholder={isLogin ? 'you@email.com or @username' : 'you@email.com'} /></Field>
          <Field label="Password"><PasswordInput placeholder="••••••••" /></Field>
          <button className="cs-btn cs-btn--primary" style={{ width: '100%', padding: '13px', fontSize: 15 }} onClick={() => go('dashboard')}>{isLogin ? 'Login' : 'Create Account'}</button>
        </div>
        <p style={{ marginTop: 20, textAlign: 'center', fontSize: 13.5, color: 'var(--ink-500)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <a href="#" onClick={e => { e.preventDefault(); go(isLogin ? 'signup' : 'login'); }} style={{ color: 'var(--brand-600)', fontWeight: 600, textDecoration: 'none' }}>{isLogin ? 'Sign up' : 'Login'}</a>
        </p>
      </div>
    </div>
  );
}

// ── Error screens (full-bleed, brand-consistent) ───────────────
function MErrorShell({ go, children }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'radial-gradient(72% 34% at 50% 4%, rgba(234,88,12,.08), rgba(234,88,12,0) 60%), #fff' }}>
      <div style={{ padding: `${TOP_SAFE}px 22px 0` }}>
        <button onClick={() => go && go('landing')} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'none' }}>
          <LogoMark size={26} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Crevia</span>
        </button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px 26px 80px' }}>
        {children}
      </div>
    </div>
  );
}

function MNotFound({ go }) {
  return (
    <MErrorShell go={go}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 104, lineHeight: 0.95, letterSpacing: '-0.05em', color: 'var(--brand-600)' }}>404</div>
      <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em' }}>Page not found</h1>
      <p style={{ margin: '12px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-500)' }}>
        The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28, width: '100%' }}>
        <button className="cs-btn cs-btn--primary" style={{ padding: '14px', fontSize: 15, width: '100%' }} onClick={() => go && go('dashboard')}>Back to Dashboard</button>
        <button className="cs-btn cs-btn--ghost" style={{ padding: '14px', fontSize: 15, width: '100%' }} onClick={() => go && go('landing')}>Go to Home</button>
      </div>
    </MErrorShell>
  );
}

function MServiceError({ go }) {
  return (
    <MErrorShell go={go}>
      <div style={{ width: 80, height: 80, borderRadius: 22, background: 'var(--brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-600)' }}>
        <IconAlert size={38} />
      </div>
      <div style={{ marginTop: 20, fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>Error 500</div>
      <h1 style={{ margin: '8px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em' }}>Something went wrong</h1>
      <p style={{ margin: '12px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-500)' }}>
        We couldn't reach our servers. This one's on us — please try again in a moment.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28, width: '100%' }}>
        <button className="cs-btn cs-btn--primary" style={{ padding: '14px', fontSize: 15, width: '100%' }}><IconRefresh size={17} /> Try Again</button>
        <button className="cs-btn cs-btn--ghost" style={{ padding: '14px', fontSize: 15, width: '100%' }} onClick={() => go && go('dashboard')}>Back to Dashboard</button>
      </div>
      <p style={{ margin: '22px 0 0', fontSize: 13, color: 'var(--ink-400)' }}>
        Still stuck? <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--brand-600)', fontWeight: 600, textDecoration: 'none' }}>Contact support</a>
      </p>
    </MErrorShell>
  );
}

Object.assign(window, { MHeader, MTabBar, MDashboard, MDeadlinesEmpty, MBoard, MModal, MAIStudio, MSettings, MAuth, MLanding, MNotFound, MServiceError });
