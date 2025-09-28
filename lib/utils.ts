import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getConvexImageUrl(storageId: string): string {
  const url = new URL(`${process.env.NEXT_PUBLIC_CONVEX_SITE_URL}/getImage`);
  url.searchParams.set("storageId", storageId);
  return url.toString();
}
