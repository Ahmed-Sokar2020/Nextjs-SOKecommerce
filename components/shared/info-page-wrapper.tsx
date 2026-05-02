import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import Footer from "./footer";
import Header from "./header";

export default function InfoPageWrapper({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 min-h-screen bg-background">
        <div className="flex flex-col gap-4 max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="flex gap-3">
            <Link href="/">
              <Button className="cursor-pointer">Go Home</Button>
            </Link>
          </div>
          <div className="bg-card border rounded-2xl p-6 md:p-10 shadow-sm">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              {title}
            </h1>

            <div className="space-y-8 text-muted-foreground leading-8 text-[15px] md:text-base">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
