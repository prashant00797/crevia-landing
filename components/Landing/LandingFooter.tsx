import { CreviaLogo } from "@/components/Landing/CreviaLogo";
import { footerLinks } from "@/data/landing-data";

function LandingFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-377.5 flex-col gap-6 px-7 py-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:px-10 lg:py-11">
        <div>
          <CreviaLogo className="[&>span:last-child]:text-background" />
          <p className="mt-2.5 text-sm font-medium text-background/55 md:text-base">
            &copy; 2026 &middot; Designed & Developed by Prashant
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {footerLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.to}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/10 px-4 py-2.5 text-sm font-semibold text-background/80 transition-colors hover:bg-primary hover:text-primary-foreground md:px-5 md:py-3 md:text-lg"
              >
                <Icon className="size-4" />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export { LandingFooter };
