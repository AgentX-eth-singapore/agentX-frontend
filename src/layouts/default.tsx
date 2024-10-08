import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
  stage,
}: {
  children: React.ReactNode;
  stage: string;
}) {
  return (
    <div className="relative flex flex-col">
      <Navbar stage={stage} />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-40">
        {children}
      </main>
    </div>
  );
}
