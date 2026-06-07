import { landingFeatures } from "@/data/landing-data";
import { Card, CardContent } from "@/components/ui/card";

function LandingFeatureGrid() {
  return (
    <section className="mx-auto w-full max-w-377.5 px-7 pt-5 pb-12 lg:px-10 lg:pt-14 lg:pb-20">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {landingFeatures.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card
              key={feature.title}
              className="min-h-28 rounded-lg border-border shadow-card lg:min-h-56"
            >
              <CardContent className="flex items-center gap-4 p-5 md:block lg:gap-6 lg:p-7">
                <div className="mb-0 inline-flex size-12 shrink-0 items-center justify-center rounded-md bg-accent text-primary md:mb-7 md:size-14">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground md:mt-2 lg:text-xl">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export { LandingFeatureGrid };
