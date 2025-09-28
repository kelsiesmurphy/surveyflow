import type { Metadata } from "next";
import { brand } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: `Survey | ${brand.name}`,
  description: brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 justify-center md:items-center">
      <div className="w-full max-w-md p-4 space-y-4 flex-1 flex min-h-[500px]">
        {children}
      </div>
    </div>
  );
}
