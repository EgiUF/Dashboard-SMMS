"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getKonten, getTopKonten, getGrowth } from "@/lib/services/konten";
import { logoutAdmin } from "@/lib/services/auth";
import { getUserWorkspaces } from "@/lib/services/workspace";
import { useRouter } from "next/navigation";

export default function Home() {
  const [konten, setKonten] = useState<any[]>([]);
  const [topKonten, setTopKonten] = useState<any[]>([]);
  const [growth, setGrowth] = useState<any>(null);

  const [workspace, setWorkspace] = useState<any>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
    } else {
      try {
        const workspaces = await getUserWorkspaces(data.user.id);
        const userWorkspace = workspaces?.[0];
        setWorkspace(userWorkspace);

        if (userWorkspace) {
          fetchDashboardData(userWorkspace.id_workspace);
        }
      } catch (error) {
        console.error("Error loading workspace data", error);
      }
    }
  }

  async function fetchDashboardData(workspaceId: number) {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // 1-12
      
      const kontenData = await getKonten(workspaceId);
      setKonten(kontenData || []);

      const topData = await getTopKonten(workspaceId, currentYear, currentMonth);
      setTopKonten(topData || []);

      const growthData = await getGrowth(workspaceId, currentYear, currentMonth);
      setGrowth(growthData);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  }

  async function handleLogout() {
    try {
      await logoutAdmin();
      router.push("/login");
    } catch (error: any) {
      console.error("Failed to logout:", error.message);
    }
  }



  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Dashboard SMMS {workspace && `- ${workspace.nama_workspace}`}</h1>

      {/* 🔐 LOGOUT */}
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      {/* 🔥 GROWTH */}
      <h2>Growth Views</h2>
      {growth && (
        <div>
          <p>Bulan lalu: {growth.total_views_bulan_lalu}</p>
          <p>Bulan ini: {growth.total_views_bulan_ini}</p>
          <p>Growth: {growth.growth_percentage}%</p>
        </div>
      )}

      {/* 🏆 TOP KONTEN */}
      <h2>Top Konten</h2>
      {topKonten.map((item) => (
        <div key={item.id_konten}>
          <p>
            {item.nama_konten} - {item.metric_value}
          </p>
        </div>
      ))}

      {/* 📋 SEMUA KONTEN */}
      <h2>Semua Konten</h2>
      {konten.map((item) => (
        <div key={item.id_konten}>
          <p>{item.nama_konten}</p>
        </div>
      ))}
    </div>
  );
}