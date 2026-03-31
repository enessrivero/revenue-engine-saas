import type { Metadata } from "next";
import { mockDashboardData } from "./_data/mockDashboardData";
import { DashboardClient } from "./_components/DashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Yonetici analitik paneli",
};

export default function DashboardPage() {
  return <DashboardClient data={mockDashboardData} />;
}
