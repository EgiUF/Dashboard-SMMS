"use client";

import { useState } from "react";
import { registerAdmin } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [namaLengkap, setNamaLengkap] = useState("");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await registerAdmin(email, password, namaLengkap);
      alert("Register berhasil, silakan login!");
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>

      <input
        placeholder="Nama Lengkap"
        onChange={(e) => setNamaLengkap(e.target.value)}
      />
      <br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}