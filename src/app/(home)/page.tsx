"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  console.log(status);

  return (
    <>
      Home 입니다
      <div>{session?.user ? session.user.name : "정보없음"}</div>
    </>
  );
}
