import { Header } from "@/components/marketing/header";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main id="content" className="flex-1 flex py-16 px-4">
        <div className="flex items-center justify-center flex-col w-full">
          {children}
        </div>
      </main>
    </>
  );
}
