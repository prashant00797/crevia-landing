import Image from "next/image";

import { cn } from "@/lib/utils";

function CreviaLogo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "inline-flex size-8 shrink-0 overflow-hidden rounded-sm",
          markClassName,
        )}
      >
        <Image
          src="/favicon.ico"
          alt="Crevia Logo"
          aria-hidden="true"
          width={40}
          height={40}
          unoptimized
          className="size-full object-cover"
        />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        Crevia
      </span>
    </div>
  );
}

export { CreviaLogo };
