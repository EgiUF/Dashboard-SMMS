"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Only check if user is logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Technically they should have a session after the callback route,
        // if not, it means link is invalid or expired
        setError("Sesi tidak valid atau telah berakhir. Silakan minta link reset yang baru.");
      }
    };
    checkUser();
  }, [supabase]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c231f] font-sans p-6 sm:p-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-[#146b4f] rounded-full blur-[150px] opacity-20 -translate-x-1/2 -translate-y-1/2 -z-10" />

      <div className="w-full max-w-md bg-[#161E20] p-10 sm:p-14 rounded-[3rem] shadow-2xl relative z-10 border border-white/5">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#052e24] border border-[#10b981]/30 flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#10b981]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Buat Password Baru</h1>
          <p className="text-[#849591] text-sm leading-relaxed px-2">
            Pastikan password baru Anda kuat dan belum pernah digunakan sebelumnya.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center justify-center p-6 bg-[#10b981]/10 border border-[#10b981]/20 rounded-2xl">
              <CheckCircle2 className="w-12 h-12 text-[#10b981] mb-3" />
              <p className="text-white font-medium">
                Password berhasil diperbarui!
              </p>
              <p className="text-[#849591] text-xs mt-2">
                Anda sekarang dapat masuk menggunakan password baru.
              </p>
            </div>
            <Link 
              href="/login"
              className="w-full py-4 bg-[#052e24] border border-[#10b981]/30 text-white font-semibold rounded-xl hover:bg-[#073d30] transition-all flex items-center justify-center gap-2 text-sm"
            >
              Lanjutkan ke Login
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#849591] flex items-center gap-2">
                Password Baru
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-[#0f1516] border border-white/10 text-white placeholder:text-[#455753] rounded-xl outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/50 transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#849591] flex items-center gap-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-[#0f1516] border border-white/10 text-white placeholder:text-[#455753] rounded-xl outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/50 transition-all text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-[#052e24] border border-[#10b981]/30 text-white font-semibold rounded-xl hover:bg-[#073d30] active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-70 text-sm"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Simpan Password Baru"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
