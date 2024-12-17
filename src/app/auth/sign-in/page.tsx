"use client";

import React from "react";
import { signIn } from "next-auth/react";
export default function SignIn() {
  const credentialsAction = (formData: FormData) => {
    const credentials = Object.fromEntries(formData);
    signIn("credentials", credentials);
  };

  return (
    <div>
      <h1>로그인</h1>
      <form action={credentialsAction}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input type="text" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
