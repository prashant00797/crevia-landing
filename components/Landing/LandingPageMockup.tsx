import { LayoutGrid, Settings, Sparkles, SquareKanban } from "lucide-react";

import { CreviaLogo } from "@/components/Landing/CreviaLogo";

const dashboardStats = [
  { label: "Total Content", value: "18", highlight: true },
  { label: "Ideas Pending", value: "6" },
  { label: "Writing", value: "3" },
];

const boardCards = [
  {
    title: "5 AI Tools Every Creator Should Try",
    tag: "YouTube",
    color: "red",
    date: "Jun 08",
  },
  {
    title: "Morning Routine as a Creator",
    tag: "Instagram",
    color: "violet",
    date: "Jun 10",
  },
  {
    title: "Best Cameras for Beginners",
    tag: "Blog",
    color: "green",
    date: "Jun 12",
  },
  {
    title: "How to Grow on YouTube in 2025",
    tag: "YouTube",
    color: "red",
    date: "Jun 15",
  },
];

const captions = [
  "5 AI tools that can seriously level up your content game.",
  "AI is not replacing creators, but creators using AI are replacing slow workflows.",
  "Content creation just got easier with these tools.",
];

function BrowserShot({
  children,
  className,
  sourceWidth,
  sourceHeight,
  scale,
}: {
  children: React.ReactNode;
  className?: string;
  sourceWidth: number;
  sourceHeight: number;
  scale: number;
}) {
  return (
    <div
      className={[
        "absolute overflow-hidden rounded-xl border border-line/80 bg-card shadow-modal",
        className,
      ].join(" ")}
      style={{
        width: sourceWidth * scale,
        height: sourceHeight * scale,
      }}
    >
      <div
        className="origin-top-left"
        style={{
          width: sourceWidth,
          height: sourceHeight,
          transform: `scale(${scale})`,
        }}
      >
        <div className="flex h-14 items-center gap-4 border-b border-line/70 bg-card px-7">
          <span className="size-4 rounded-full bg-red-400" />
          <span className="size-4 rounded-full bg-yellow-400" />
          <span className="size-4 rounded-full bg-green-500" />
          <span className="ml-5 h-5 flex-1 rounded-full bg-muted" />
        </div>
        <div className="h-[calc(100%-3.5rem)]">{children}</div>
      </div>
    </div>
  );
}

function MiniPill({ label, color }: { label: string; color: string }) {
  const colorClass =
    color === "green"
      ? "bg-green-50 text-green-700"
      : color === "violet"
        ? "bg-violet-50 text-violet-600"
        : "bg-red-50 text-red-600";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}
    >
      <span className="size-2 rounded-full bg-current" />
      {label}
    </span>
  );
}

function DashboardPreview() {
  return (
    <div className="flex h-full bg-muted">
      <aside className="w-64 shrink-0 border-r border-line bg-card p-7">
        <CreviaLogo
          className="mb-10 gap-3 [&>span:last-child]:text-2xl"
          markClassName="size-10"
        />
        <div className="space-y-5 text-base font-semibold text-muted-foreground">
          <div className="flex items-center gap-3 rounded-md bg-accent px-4 py-4 text-primary">
            <LayoutGrid className="size-5" />
            Dashboard
          </div>
          <div className="flex items-center gap-3 px-4 py-2">
            <SquareKanban className="size-5" />
            Content Board
          </div>
          <div className="flex items-center gap-3 px-4 py-2">
            <Sparkles className="size-5" />
            AI Studio
          </div>
          <div className="flex items-center gap-3 px-4 py-2">
            <Settings className="size-5" />
            Settings
          </div>
        </div>
      </aside>
      <div className="min-w-0 flex-1 p-8">
        <h3 className="font-display text-3xl font-bold">Dashboard</h3>
        <p className="mt-10 font-display text-3xl font-bold">
          Good morning, Prashant
        </p>
        <p className="mt-2 text-lg text-muted-foreground">
          Here&apos;s what&apos;s happening with your content today.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {dashboardStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-line bg-card p-7 shadow-card"
            >
              <p className="text-lg font-semibold text-muted-foreground">
                {stat.label}
              </p>
              <p
                className={`mt-5 font-display text-6xl font-bold ${stat.highlight ? "text-primary" : "text-foreground"}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-line bg-card p-7 shadow-card">
          <div className="h-5 w-56 rounded-full bg-foreground/90" />
          <div className="mt-7 space-y-5">
            <div className="h-3 rounded-full bg-line" />
            <div className="h-3 w-4/5 rounded-full bg-line" />
            <div className="h-3 w-3/5 rounded-full bg-line" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BoardPreview() {
  return (
    <div className="h-full bg-muted p-7">
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-3xl font-bold">Content Board</h3>
          <p className="mt-2 text-base text-muted-foreground">
            Drag and move your content across the pipeline.
          </p>
        </div>
        <span className="shrink-0 rounded-md bg-primary px-6 py-3 text-base font-bold text-primary-foreground">
          New Content
        </span>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {["Ideas", "Writing", "Editing", "Published"].map((column, index) => (
          <div key={column}>
            <p className="mb-4 font-display text-xl font-bold">{column}</p>
            <div className="space-y-4">
              <div className="rounded-xl border border-line bg-card p-5 shadow-card">
                <p className="line-clamp-2 font-display text-lg font-bold leading-tight">
                  {boardCards[index].title}
                </p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <MiniPill
                    label={boardCards[index].tag}
                    color={boardCards[index].color}
                  />
                  <span className="shrink-0 text-sm font-semibold text-muted-foreground">
                    {boardCards[index].date}
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-dashed border-line px-5 py-4 text-base font-semibold text-ink-400">
                + Add Card
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIStudioPreview() {
  return (
    <div className="h-full bg-muted p-8">
      <h3 className="font-display text-3xl font-bold">AI Studio</h3>
      <p className="mt-2 text-base text-muted-foreground">
        Use AI to supercharge your content creation.
      </p>
      <div className="mt-6 flex gap-8 border-b border-line text-base font-bold">
        <span className="border-b-2 border-primary pb-4 text-primary">
          Caption Generator
        </span>
        <span className="pb-4 text-muted-foreground">
          Content Idea Generator
        </span>
        <span className="pb-4 text-muted-foreground">
          Sponsor Email Generator
        </span>
      </div>
      <div className="mt-7 grid grid-cols-[0.95fr_1.05fr] gap-7">
        <div className="rounded-xl border border-line bg-card p-7 shadow-card">
          <p className="text-lg font-bold">
            Topic / What&apos;s your post about?
          </p>
          <div className="mt-4 h-24 rounded-lg border border-line bg-background p-5 text-base">
            5 AI tools that every creator should try
          </div>
          <p className="mt-6 text-lg font-bold">Platform</p>
          <div className="mt-4 h-12 rounded-lg border border-line bg-background" />
          <div className="mt-7 rounded-lg bg-primary px-6 py-4 text-center text-lg font-bold text-primary-foreground">
            Generate Captions
          </div>
        </div>
        <div className="rounded-xl border border-line bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-line p-7">
            <p className="font-display text-xl font-bold">Generated Captions</p>
            <span className="rounded-full border border-line px-5 py-2 text-base font-bold">
              Copy All
            </span>
          </div>
          <div className="divide-y divide-line px-7">
            {captions.map((caption) => (
              <p
                key={caption}
                className="py-5 text-base leading-relaxed text-foreground"
              >
                {caption}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingBrowserMockup() {
  return (
    <div
      className="relative hidden h-124 min-h-124 w-full select-none lg:block"
      aria-hidden="true"
    >
      <div className="absolute inset-x-6 top-12 bottom-10 rounded-4xl bg-primary/10 blur-3xl" />
      <BrowserShot
        className="top-24 left-6 z-10 rotate-[-1.2deg] opacity-90"
        sourceWidth={1120}
        sourceHeight={680}
        scale={0.5}
      >
        <DashboardPreview />
      </BrowserShot>
      <BrowserShot
        className="right-0 top-0 z-30 rotate-[2.6deg]"
        sourceWidth={1010}
        sourceHeight={620}
        scale={0.43}
      >
        <AIStudioPreview />
      </BrowserShot>
      <BrowserShot
        className="bottom-6 -left-6 z-40 -rotate-3"
        sourceWidth={1120}
        sourceHeight={650}
        scale={0.43}
      >
        <BoardPreview />
      </BrowserShot>
    </div>
  );
}

export { LandingBrowserMockup };
