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
      <label htmlFor="email" className="flex flex-col gap-2">
        Email
        <input type="email" id="email" name="email" className="border border-white text-black" />
      </label>
      <label htmlFor="password" className="flex flex-col gap-2">
        Password
        <input
          type="password"
          id="password"
          name="password"
          className="border border-white text-black"
        />
      </label>
      <button type="submit">Sign In</button>
    </form>
  )
}
