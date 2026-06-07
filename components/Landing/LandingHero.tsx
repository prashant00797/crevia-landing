import { LandingBrowserMockup } from "@/components/Landing/LandingPageMockup";
import { Button } from "@/components/ui/button";

function LandingHero() {
  return (
    <section className="mx-auto grid w-full max-w-377.5 items-center gap-10 px-7 pt-8 pb-10 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-10 lg:pt-28 lg:pb-16">
      <div>
        <span className="mb-4 inline-flex rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
          AI-Powered Creator Operating System
        </span>
        <h1 className="font-display text-[clamp(2.625rem,1.85rem+3.3vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-foreground">
          Your Operating <br className="hidden lg:block" />
          System for <br className="hidden lg:block" />
          <span className="text-primary">Content Creation</span>
        </h1>
        <p className="mt-5 max-w-140 text-lg leading-relaxed text-muted-foreground lg:mt-7 lg:text-2xl">
          Manage ideas, track content and generate AI-powered content from a single workspace.
        </p>

        <div className="mt-6 flex flex-col gap-3 md:hidden">
          <Button className="h-14 rounded-md text-base font-bold shadow-brand hover:bg-brand-700">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="h-14 rounded-md border-primary text-base font-semibold text-primary hover:bg-accent"
          >
            Demo
          </Button>
        </div>
      </div>

      <LandingBrowserMockup />
    </section>
  );
}

export { LandingHero };
