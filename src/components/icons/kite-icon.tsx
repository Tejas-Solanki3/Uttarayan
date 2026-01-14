import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function KiteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2 4 12l8 10 8-10-8-10zM12 2v20" />
    </svg>
  );
}
