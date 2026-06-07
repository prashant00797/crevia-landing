// data.jsx — Crevia content (verbatim from spec). On window.
const CS_DATA = {
  user: { name: 'Prashant Nath', role: 'Creator', email: 'prashant@email.com', username: 'prashantnath' },

  nav: [
    { id: 'dashboard', label: 'Dashboard',     icon: 'IconDashboard' },
    { id: 'board',     label: 'Content Board',  icon: 'IconBoard' },
    { id: 'ai',        label: 'AI Studio',       icon: 'IconAI' },
    { id: 'settings',  label: 'Settings',        icon: 'IconSettings' },
  ],

  stats: [
    { label: 'Total Content', value: '18' },
    { label: 'Ideas Pending', value: '6'  },
    { label: 'Writing',       value: '3'  },
    { label: 'Editing',       value: '2'  },
    { label: 'Published',     value: '7'  },
  ],

  deadlines: [
    { title: '5 AI Tools Every Creator Should Try', platform: 'YouTube',   date: 'Jun 08' },
    { title: 'Morning Routine as a Creator',         platform: 'YouTube',   date: 'Jun 10' },
    { title: 'How to Grow on YouTube in 2025',       platform: 'Instagram', date: 'Jun 15' },
  ],

  aiSuggestion: "Create a video on 'AI Tools That Save Creators 10+ Hours a Week'",

  board: [
    { name: 'Ideas', count: 3, cards: [
      { title: '5 AI Tools Every Creator Should Try', platform: 'YouTube', date: 'Due Jun 08' },
      { title: 'My Studio Setup Tour',                platform: 'YouTube', date: 'Due Jun 20' },
      { title: 'Beginner Camera Guide',              platform: 'Blog',    date: 'Due Jun 25' },
    ]},
    { name: 'Writing', count: 2, cards: [
      { title: 'Morning Routine as a Creator', platform: 'Instagram', date: 'Due Jun 10' },
      { title: 'Best Cameras for Beginners',   platform: 'Blog',      date: 'Due Jun 12' },
    ]},
    { name: 'Editing', count: 2, cards: [
      { title: 'How to Grow on YouTube in 2025', platform: 'YouTube',   date: 'Due Jun 15' },
      { title: 'Studio Tour 2024 Setup & Gear',  platform: 'Instagram', date: 'Due Jul 02' },
    ]},
    { name: 'Published', count: 3, cards: [
      { title: '10 AI Tools for Creators',  platform: 'Instagram', date: 'Published May 30' },
      { title: 'How I Edit My Videos',      platform: 'YouTube',   date: 'Published May 18' },
      { title: 'My Productivity Secrets',   platform: 'Blog',      date: 'Published May 15' },
    ]},
  ],

  platforms: ['YouTube', 'Instagram', 'Twitter', 'Blog', 'Other'],
  stages: ['Ideas', 'Writing', 'Editing', 'Published'],

  captions: [
    "5 AI tools that can seriously level up your content game 🔥 Save time, stay consistent, and create better content. Which one is your favourite? 🙌\n#AITools #ContentCreator #CreatorLife",
    "AI isn't replacing creators, but creators using AI are replacing those who don't. Here are 5 tools to get you started 🚀\n#AITools #ContentCreation #Productivity",
    "Content creation just got easier with these 5 AI tools! Try them and thank me later 😄\n#ContentCreator #AITools #CreatorMove",
  ],

  ideas: [
    "10 Mistakes Every New YouTuber Makes (And How to Fix Them)",
    "How to Film a YouTube Video With Just Your Phone in 2025",
    "YouTube vs Instagram: Where Should You Post First?",
    "The 5-Step Content Workflow That Doubled My Views",
    "How I Plan a Full Month of YouTube Content in 1 Hour",
  ],

  email: {
    subject: "Subject: Partnership Opportunity — Crevia x Notion",
    body: `Hi Notion Team,

My name is Prashant Nath and I run a YouTube channel focused on helping creators build smarter workflows. My audience of 15,000+ subscribers are productivity-focused creators who are always looking for tools to level up.

I've been a Notion user for over a year and I genuinely believe it would be a perfect fit for my upcoming video series on creator productivity.

I'd love to explore a potential sponsorship or collaboration. Happy to share my media kit and channel stats if you're interested.

Looking forward to connecting,
Prashant Nath
Crevia`,
  },

  // AI generation history — { tool: caption|idea|sponsor, prompt, platform, tone, result, createdBy, createdAt }
  history: [
    { tool: 'caption', prompt: '5 AI tools that every creator should try', platform: 'Instagram', tone: 'Casual',
      createdBy: 'Prashant Nath', createdAt: 'Jun 04, 2026 · 1:12 PM',
      result: "5 AI tools that can seriously level up your content game 🔥 Save time, stay consistent, and create better content. Which one is your favourite? 🙌\n#AITools #ContentCreator #CreatorLife" },
    { tool: 'idea', prompt: 'YouTube tips for beginner creators', platform: 'YouTube', tone: 'Friendly',
      createdBy: 'Prashant Nath', createdAt: 'Jun 03, 2026 · 6:40 PM',
      result: "1. 10 Mistakes Every New YouTuber Makes (And How to Fix Them)\n2. How to Film a YouTube Video With Just Your Phone in 2025\n3. YouTube vs Instagram: Where Should You Post First?" },
    { tool: 'sponsor', prompt: 'Notion — productivity & note-taking app', platform: 'YouTube', tone: 'Professional',
      createdBy: 'Prashant Nath', createdAt: 'Jun 02, 2026 · 11:05 AM',
      result: "Subject: Partnership Opportunity — Crevia x Notion\n\nHi Notion Team,\n\nI run a YouTube channel helping 15,000+ creators build smarter workflows. I've used Notion for over a year and would love to feature it in my upcoming series on creator productivity. Happy to share my media kit — looking forward to connecting.\n\nPrashant Nath" },
    { tool: 'caption', prompt: 'Morning routine as a creator', platform: 'Instagram', tone: 'Bold',
      createdBy: 'Prashant Nath', createdAt: 'Jun 01, 2026 · 8:22 AM',
      result: "Win the morning, win the upload 🌅 My routine: journal, gym, then 2 hours of deep-work content. No phone till the first task is done. What's your non-negotiable?\n#CreatorLife #MorningRoutine #Productivity" },
    { tool: 'idea', prompt: 'How to grow on YouTube in 2025', platform: 'YouTube', tone: 'Professional',
      createdBy: 'Prashant Nath', createdAt: 'May 30, 2026 · 4:48 PM',
      result: "1. The 5-Step Content Workflow That Doubled My Views\n2. How I Plan a Full Month of YouTube Content in 1 Hour\n3. Why Your First 1,000 Subscribers Are the Hardest" },
  ],
};

// platform → pill class + brand color
const PLATFORM = {
  YouTube:   { cls: 'pill--yt',   color: '#DC2626' },
  Instagram: { cls: 'pill--ig',   color: '#7C3AED' },
  Twitter:   { cls: 'pill--tw',   color: '#2563EB' },
  Blog:      { cls: 'pill--blog', color: '#16A34A' },
  Other:     { cls: 'pill--other', color: '#64748B' },
};

window.CS_DATA = CS_DATA;
window.PLATFORM = PLATFORM;
