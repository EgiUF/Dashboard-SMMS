"use client";

import { useState } from "react";
import { registerAdmin } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerAdmin(email, password, namaLengkap);
      alert("Pendaftaran berhasil! Silakan login untuk melanjutkan.");
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-sanggaluri rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
            S
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">SanggaluriMS</h1>
          <p className="text-gray-500 mt-2">Daftar Akun Social Media Specialist</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-border-custom shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Buat Akun Baru ✨</h2>
            <p className="text-gray-500 text-sm mt-1">Lengkapi data di bawah untuk bergabung.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Contoh: Andi Wijaya"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-border-custom rounded-2xl outline-none focus:ring-2 focus:ring-sanggaluri/20 focus:bg-white transition-all"
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Kantor</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="admin@sanggaluri.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-border-custom rounded-2xl outline-none focus:ring-2 focus:ring-sanggaluri/20 focus:bg-white transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Min. 8 Karakter"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-border-custom rounded-2xl outline-none focus:ring-2 focus:ring-sanggaluri/20 focus:bg-white transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 bg-sanggaluri text-white font-bold rounded-2xl shadow-lg hover:bg-sanggaluri-light active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Daftar Sekarang</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Sudah memiliki akun?{" "}
              <Link href="/login" className="font-bold text-sanggaluri hover:underline">Masuk</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}