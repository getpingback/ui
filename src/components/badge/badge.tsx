import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      type: {
        new: "bg-badge-new text-badge-new-foreground",
        counter: "bg-badge-counter text-badge-counter-foreground",
        soon: "bg-badge-soon text-badge-soon-foreground",
        suspended: "bg-badge-suspended text-badge-suspended-foreground",
      },
      variant: {
        outline: "bg-transparent",
        ghost: "border-none",
      },
      radius: {
        full: "rounded-full",
        medium: "rounded-md",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        type: "new",
        className: "border border-badge-new",
      },
      {
        variant: "outline",
        type: "counter",
        className: "border border-badge-counter",
      },
      {
        variant: "outline",
        type: "soon",
        className: "border border-badge-soon",
      },
      {
        variant: "outline",
        type: "suspended",
        className: "border border-badge-suspended",
      },
    ],
    defaultVariants: {
      type: "new",
      radius: "full",
      variant: "ghost",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, type, radius, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, type, radius }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
