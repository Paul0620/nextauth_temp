'use client'

import { signIn } from 'next-auth/react'

export default function SignIn() {
  const credentialsAction = (formData: FormData) => {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    signIn('credentials', data)
  }

  return (
    <form action={credentialsAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2" htmlFor="email">
        Email
        <input className="border border-white text-black" id="email" name="email" type="email" />
      </label>
      <label className="flex flex-col gap-2" htmlFor="password">
        Password
        <input
          className="border border-white text-black"
          id="password"
          name="password"
          type="password"
        />
      </label>
      <button type="submit">Sign In</button>
    </form>
  )
}
