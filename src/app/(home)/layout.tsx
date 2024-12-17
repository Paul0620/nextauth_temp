"use client";

import { SessionProvider } from "next-auth/react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
        {children}
      </div>
    </SessionProvider>
  );
}
