"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session?.user);

  return (
    <>
      Home 입니다 123
      <div>{session?.user ? session.user.name : "정보없음"}</div>
    </>
  );
}
