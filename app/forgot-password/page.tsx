"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function handleReset() {
    try {
      await resetPassword(email);
      alert("Link reset password telah dikirim ke email!");
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Lupa Password</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <button onClick={handleReset} style={{ marginTop: 10 }}>Kirim Link Reset</button>
      <br />
      <button onClick={() => router.push("/login")} style={{ marginTop: 10 }}>Kembali ke Login</button>
    </div>
  );
}
