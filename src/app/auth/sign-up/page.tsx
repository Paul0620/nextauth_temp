"use client";

import { handleSignUp, SignUpFormData } from "@/db/auth/actions/auth-action";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignUp() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data: SignUpFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
    };

    try {
      await handleSignUp(data);
      router.replace("/auth/sign-in");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input type="text" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <label htmlFor="name">이름:</label>
          <input type="text" id="name" name="name" />
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
