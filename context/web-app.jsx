// web-app.jsx — Dashboard, ContentBoard, ContentModal, AIStudio, Settings. On window.
const { useState: useS } = React;

// ───────────────────────── Dashboard ─────────────────────────
function DeadlinesEmpty() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '38px 20px 30px' }}>
      <div style={{ width: 62, height: 62, borderRadius: 18, background: 'var(--brand-50)', color: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconCheck size={30} />
      </div>
      <h4 style={{ margin: '17px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em', color: 'var(--ink-900)' }}>No deadlines</h4>
      <p style={{ margin: '6px 0 0', fontSize: 14.5, color: 'var(--ink-500)' }}>You're all set.</p>
    </div>
  );
}

function Dashboard({ go, openModal, deadlines }) {
  const D = CS_DATA;
  const list = deadlines || D.deadlines;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar title="Dashboard">
        <button className="cs-btn cs-btn--primary" onClick={openModal}><IconPlus size={17} /> New Content</button>
      </TopBar>

      <div style={{ flex: 1, overflow: 'auto', padding: '28px 32px' }}>
        <h2 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 25, letterSpacing: '-0.02em' }}>Good morning, Prashant 👋</h2>
        <p style={{ margin: '0 0 26px', color: 'var(--ink-500)', fontSize: 15 }}>Here's what's happening with your content today.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 22 }}>
          {D.stats.map((s, i) => (
            <div key={s.label} className="cs-card" style={{ padding: '22px' }}>
              <div style={{ fontSize: 13.5, color: 'var(--ink-500)', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 42, lineHeight: 1, marginTop: 14, letterSpacing: '-0.02em', color: i === 0 ? 'var(--brand-600)' : 'var(--ink-900)' }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18 }}>
          {/* deadlines */}
          <div className="cs-card" style={{ padding: '22px 24px' }}>
            <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17 }}>Upcoming Deadlines</h3>
            {list.length === 0 ? <DeadlinesEmpty /> : (
              <React.Fragment>
                <div>
                  {list.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
                      <span style={{ flex: 1, fontWeight: 600, fontSize: 14.5 }}>{d.title}</span>
                      <PlatformPill platform={d.platform} />
                      <span style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 600, minWidth: 52, textAlign: 'right' }}>{d.date}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => go('board')} style={{ marginTop: 14, color: 'var(--brand-600)', fontWeight: 600, fontSize: 13.5, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  View all deadlines <IconArrowRight size={15} />
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────── Content Board ───────────────────────
function ContentBoard({ openModal }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar title="Content Board">
        <button className="cs-btn cs-btn--primary" onClick={openModal}><IconPlus size={17} /> New Content</button>
      </TopBar>
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
        <p style={{ margin: '0 0 22px', color: 'var(--ink-500)', fontSize: 15 }}>Drag and move your content across the pipeline.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {CS_DATA.board.map((col) => (
            <div key={col.name}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px 12px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14.5, color: 'var(--ink-700)' }}>{col.name}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.cards.map((c, i) => <BoardCard key={i} card={c} />)}
                <button style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 'var(--r-md)', color: 'var(--ink-400)', fontWeight: 600, fontSize: 13.5, border: '1.5px dashed var(--line)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-600)'; e.currentTarget.style.borderColor = 'var(--brand-200)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-400)'; e.currentTarget.style.borderColor = 'var(--line)'; }}>
                  + Add Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BoardCard({ card }) {
  return (
    <div className="cs-card" style={{ padding: '14px 15px', cursor: 'grab', transition: 'box-shadow .15s, transform .12s' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--sh-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--sh-sm)'; e.currentTarget.style.transform = 'none'; }}>
      <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.35, marginBottom: 12, textWrap: 'pretty' }}>{card.title}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PlatformPill platform={card.platform} />
        <span style={{ fontSize: 12, color: 'var(--ink-400)', fontWeight: 600 }}>{card.date}</span>
      </div>
    </div>
  );
}

// ──────────────────────── Content Modal ───────────────────────
function ContentModal({ onClose }) {
  const D = CS_DATA;
  const [stage, setStage] = useS('Ideas');
  const [platform, setPlatform] = useS('YouTube');
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 100, background: 'rgba(17,24,39,.55)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 560, maxWidth: '100%', maxHeight: '90%', overflow: 'auto', background: '#fff', borderRadius: 'var(--r-xl)', boxShadow: 'var(--sh-modal)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 26px 18px', borderBottom: '1px solid var(--line-soft)' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>Add New Content</h2>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 9, color: 'var(--ink-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}><IconClose size={19} /></button>
        </div>
        <div style={{ padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Field label="Title"><input className="cs-input" placeholder="What's your content about?" /></Field>
          <Field label="Description"><textarea className="cs-input" rows={3} placeholder="Add notes, ideas, or details about this content..." style={{ resize: 'vertical', lineHeight: 1.5 }} /></Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Platform"><Select value={platform} options={D.platforms} onChange={setPlatform} /></Field>
            <Field label="Due Date"><input className="cs-input" type="date" /></Field>
          </div>
          <Field label="Stage">
            <div style={{ display: 'flex', gap: 8 }}>
              {D.stages.map(s => {
                const on = stage === s;
                return (
                  <button key={s} onClick={() => setStage(s)} style={{
                    flex: 1, padding: '9px 0', borderRadius: 'var(--r-pill)', fontWeight: 600, fontSize: 13,
                    background: on ? 'var(--brand-600)' : 'var(--brand-50)',
                    color: on ? '#fff' : 'var(--brand-700)',
                    boxShadow: on ? 'var(--sh-brand)' : 'none', transition: 'all .14s',
                  }}>{s}</button>
                );
              })}
            </div>
          </Field>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '18px 26px', borderTop: '1px solid var(--line-soft)' }}>
          <button className="cs-btn cs-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="cs-btn cs-btn--primary" onClick={onClose}>Save Content</button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────── AI Studio ─────────────────────────
function AIStudio() {
  const [tab, setTab] = useS('caption');
  const tabs = [
    { id: 'caption', label: 'Caption Generator' },
    { id: 'idea',    label: 'Content Idea Generator' },
    { id: 'email',   label: 'Sponsor Email Generator' },
    { id: 'history', label: 'Generation History' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 32px 0', borderBottom: '1px solid var(--line)', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>AI Studio</h1>
            <p style={{ margin: '4px 0 0', color: 'var(--ink-500)', fontSize: 14.5 }}>Use AI to supercharge your content creation.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28, marginTop: 18 }}>
          {tabs.map(t => {
            const on = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: '12px 0', fontWeight: 600, fontSize: 14.5, position: 'relative',
                color: on ? 'var(--brand-700)' : 'var(--ink-500)',
                borderBottom: on ? '2.5px solid var(--brand-600)' : '2.5px solid transparent', marginBottom: -1,
              }}>{t.label}</button>
            );
          })}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
        {tab === 'caption' && <CaptionTab />}
        {tab === 'idea' && <IdeaTab />}
        {tab === 'email' && <EmailTab />}
        {tab === 'history' && <GenerationHistory />}
      </div>
    </div>
  );
}

function OutputCard({ title, onCopyAll, copiedAll, children }) {
  return (
    <div className="cs-card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid var(--line-soft)' }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>{title}</h3>
        <button className="cs-btn cs-btn--ghost" style={{ padding: '7px 13px', fontSize: 13 }} onClick={onCopyAll}>
          {copiedAll ? <IconCheck size={15} /> : <IconCopy size={15} />} {copiedAll ? 'Copied' : 'Copy All'}
        </button>
      </div>
      <div style={{ padding: '6px 22px 8px' }}>{children}</div>
    </div>
  );
}

function CaptionTab() {
  const D = CS_DATA;
  const [copied, copy] = useCopy();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 20, alignItems: 'start' }}>
      <div className="cs-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Field label="Topic / What's your post about?"><textarea className="cs-input" rows={3} defaultValue="5 AI tools that every creator should try" style={{ resize: 'vertical', lineHeight: 1.5 }} /></Field>
        <Field label="Platform"><Select value="Instagram" options={D.platforms} /></Field>
        <Field label="Tone"><Select value="Casual" options={['Casual', 'Professional', 'Friendly', 'Bold']} /></Field>
        <button className="cs-btn cs-btn--primary" style={{ width: '100%', padding: '12px' }}><IconSparkle size={16} /> Generate Captions</button>
      </div>
      <OutputCard title="Generated Captions" copiedAll={copied === 'all'} onCopyAll={() => copy('all', D.captions.join('\n\n'))}>
        {D.captions.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 0', borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
            <p style={{ margin: 0, flex: 1, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-700)', whiteSpace: 'pre-line' }}>{c}</p>
            <CopyRow k={i} copied={copied} onCopy={() => copy(i, c)} />
          </div>
        ))}
      </OutputCard>
    </div>
  );
}

function IdeaTab() {
  const D = CS_DATA;
  const [copied, copy] = useCopy();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 20, alignItems: 'start' }}>
      <div className="cs-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Field label="Your Niche / Topic"><textarea className="cs-input" rows={3} defaultValue="YouTube tips for beginner creators" style={{ resize: 'vertical', lineHeight: 1.5 }} /></Field>
        <button className="cs-btn cs-btn--primary" style={{ width: '100%', padding: '12px' }}><IconSparkle size={16} /> Generate Ideas</button>
      </div>
      <OutputCard title="Generated Content Ideas" copiedAll={copied === 'all'} onCopyAll={() => copy('all', D.ideas.map((x, i) => `${i + 1}. ${x}`).join('\n'))}>
        {D.ideas.map((idea, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, background: 'var(--brand-50)', color: 'var(--brand-700)', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)' }}>{i + 1}</span>
            <span style={{ flex: 1, fontSize: 14.5, fontWeight: 500, lineHeight: 1.4 }}>{idea}</span>
            <CopyRow k={i} copied={copied} onCopy={() => copy(i, idea)} />
          </div>
        ))}
      </OutputCard>
    </div>
  );
}

function EmailTab() {
  const D = CS_DATA;
  const [copied, copy] = useCopy();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 20, alignItems: 'start' }}>
      <div className="cs-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Sponsor / Brand Name"><input className="cs-input" defaultValue="Notion" /></Field>
        <Field label="Their Product or Service"><input className="cs-input" defaultValue="Productivity and note-taking app" /></Field>
        <Field label="Your Niche"><input className="cs-input" defaultValue="YouTube creator tips and tools" /></Field>
        <Field label="Tone"><Select value="Professional" options={['Professional', 'Casual', 'Friendly', 'Bold']} /></Field>
        <button className="cs-btn cs-btn--primary" style={{ width: '100%', padding: '12px' }}><IconSparkle size={16} /> Generate Email</button>
      </div>
      <OutputCard title="Generated Sponsor Email" copiedAll={copied === 'all'} onCopyAll={() => copy('all', D.email.subject + '\n\n' + D.email.body)}>
        <div style={{ padding: '14px 0 4px' }}>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--ink-900)' }}>{D.email.subject}</div>
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)', display: 'flex', gap: 14, paddingTop: 16, paddingBottom: 12 }}>
          <p style={{ margin: 0, flex: 1, fontSize: 14, lineHeight: 1.65, color: 'var(--ink-700)', whiteSpace: 'pre-line' }}>{D.email.body}</p>
          <CopyRow k="body" copied={copied} onCopy={() => copy('body', D.email.body)} />
        </div>
      </OutputCard>
    </div>
  );
}

// ──────────────── AI Studio — Generation History ──────────────
const TOOL_META = {
  caption: { label: 'Caption' },
  idea:    { label: 'Content Idea' },
  sponsor: { label: 'Sponsor Email' },
};

function HMeta({ label, value }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ color: 'var(--ink-400)', fontWeight: 600 }}>{label}</span>
      <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{value}</span>
    </span>
  );
}

function GenerationHistory() {
  const D = CS_DATA;
  const [open, setOpen] = useS(0);
  const [copied, copy] = useCopy();
  const [page, setPage] = useS(0);
  const PER_PAGE = 3;
  const pageCount = Math.ceil(D.history.length / PER_PAGE);
  const pageItems = D.history.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const goPage = (p) => { setPage(p); setOpen(-1); };
  return (
    <div style={{ marginTop: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <IconHistory size={18} style={{ color: 'var(--brand-600)' }} />
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16.5, letterSpacing: '-0.01em' }}>Generation History</h3>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-400)', background: 'var(--bg)', borderRadius: 99, padding: '3px 10px' }}>{D.history.length} saved</span>
      </div>
      <div className="cs-card" style={{ padding: 0, overflow: 'hidden' }}>
        {pageItems.map((h, idx) => {
          const i = page * PER_PAGE + idx;
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderTop: idx ? '1px solid var(--line-soft)' : 'none' }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '15px 20px', textAlign: 'left',
                background: isOpen ? 'var(--brand-50)' : 'transparent', transition: 'background .14s',
              }}
                onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = 'var(--bg)'; }}
                onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = 'transparent'; }}>
                <span style={{
                  flexShrink: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11.5,
                  letterSpacing: '.02em', color: 'var(--brand-700)', background: 'var(--brand-100)',
                  borderRadius: 7, padding: '5px 10px',
                }}>{TOOL_META[h.tool].label}</span>
                <span style={{ flex: 1, minWidth: 0, fontWeight: 600, fontSize: 14, color: 'var(--ink-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.prompt}</span>
                <PlatformPill platform={h.platform} />
                <span style={{ flexShrink: 0, fontSize: 12.5, color: 'var(--ink-400)', whiteSpace: 'nowrap', minWidth: 92, textAlign: 'right' }}>{h.createdAt.split(' · ')[0]}</span>
                <IconChevDown size={18} style={{ flexShrink: 0, color: 'var(--ink-400)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .18s ease' }} />
              </button>
              {isOpen && (
                <div style={{ padding: '4px 20px 20px' }}>
                  <div style={{ display: 'flex', gap: 14, background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 'var(--r-md)', padding: '15px 16px' }}>
                    <p style={{ margin: 0, flex: 1, fontSize: 13.5, lineHeight: 1.65, color: 'var(--ink-700)', whiteSpace: 'pre-line' }}>{h.result}</p>
                    <CopyRow k={i} copied={copied} onCopy={() => copy(i, h.result)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 13, fontSize: 12.5, flexWrap: 'wrap' }}>
                    <HMeta label="Tone" value={h.tone} />
                    <HMeta label="Platform" value={h.platform} />
                    <HMeta label="By" value={h.createdBy} />
                    <HMeta label="Created" value={h.createdAt} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid var(--line-soft)' }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-400)' }}>Page {page + 1} of {pageCount}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ dir: -1, rot: 90, dis: page === 0 }, { dir: 1, rot: -90, dis: page === pageCount - 1 }].map((b, k) => (
              <button key={k} disabled={b.dis} onClick={() => goPage(page + b.dir)} style={{
                width: 32, height: 32, borderRadius: 'var(--r-sm)', border: '1px solid var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff',
                color: b.dis ? 'var(--ink-400)' : 'var(--ink-700)', opacity: b.dis ? 0.5 : 1,
                cursor: b.dis ? 'default' : 'pointer', transition: 'background .14s, border-color .14s',
              }}
                onMouseEnter={(e) => { if (!b.dis) { e.currentTarget.style.background = 'var(--brand-50)'; e.currentTarget.style.borderColor = 'var(--brand-200)'; } }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--line)'; }}>
                <IconChevDown size={16} style={{ transform: `rotate(${b.rot}deg)` }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── Settings ─────────────────────────
function Settings() {
  const u = CS_DATA.user;
  const rows = [
    { label: 'Name', value: u.name },
    { label: 'Username', value: u.username },
    { label: 'Email', value: u.email },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TopBar title="Settings" />
      <div style={{ flex: 1, overflow: 'auto', padding: '28px 32px' }}>
        <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="cs-card" style={{ padding: '24px 26px' }}>
            <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17 }}>Profile Settings</h3>
            <div>
              {rows.map((r, i) => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '15px 0', borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-500)' }}>{r.label}</span>
                  <span style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink-900)' }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cs-card" style={{ padding: '24px 26px' }}>
            <h3 style={{ margin: '0 0 18px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17 }}>Change Password</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="Current Password"><PasswordInput placeholder="••••••••" /></Field>
              <Field label="New Password"><PasswordInput placeholder="••••••••" /></Field>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <button className="cs-btn cs-btn--primary">Update Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard, DeadlinesEmpty, ContentBoard, ContentModal, AIStudio, Settings });
