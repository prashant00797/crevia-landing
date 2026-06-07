import { Button } from "@/components/ui/button";
import { CreviaLogo } from "@/components/Landing/CreviaLogo";
import { landingNavItems } from "@/data/landing-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const launchingSoonFeatures = [
  "Content Pipeline",
  "AI Studio",
  "Creator Dashboard",
];

function LaunchingSoonDialog({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={[
            "rounded-md font-bold shadow-brand hover:bg-brand-700",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          Launching Soon
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Launching Soon</DialogTitle>
          <DialogDescription>
            Crevia is currently in active development.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5">
          <p className="font-semibold text-foreground">Expected features:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            {launchingSoonFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <p className="mt-5 text-muted-foreground">
            Follow development on GitHub.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LandingNavbar() {
  return (
    <header className="mx-auto flex w-full max-w-377.5 items-center justify-between px-7 py-5 lg:px-10 lg:py-7">
      <CreviaLogo
        className="gap-3 [&>span:last-child]:text-xl"
        markClassName="size-10 rounded-md"
      />

      <nav
        aria-label="Landing page"
        className="hidden items-center gap-8 md:flex"
      >
        {landingNavItems.map((item) => (
          <a
            key={item}
            href="#"
            className="text-lg font-semibold text-foreground transition-colors hover:text-primary"
          >
            {item}
          </a>
        ))}
        {/* TODO */}
        {/* <a
          href="#"
          className="text-lg font-bold text-foreground transition-colors hover:text-primary"
        >
          Login
        </a> */}
        <LaunchingSoonDialog className="h-12 px-7 text-base" />
        <Button
          variant="outline"
          className="h-12 rounded-md border-primary px-7 text-base font-semibold text-primary hover:bg-accent"
          hidden //For now
        >
          Demo
        </Button>
      </nav>
      <div className="md:hidden">
        <LaunchingSoonDialog className="h-10 px-4 text-sm" />
      </div>
    </header>
  );
}

export { LandingNavbar };
