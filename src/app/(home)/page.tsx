'use client'

import { signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  console.log(session?.user)

  return (
    <>
      메인페이지
      <div>{session?.user ? session.user.name : '정보없음'}</div>
      --------------------------------------------------
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  )
}
