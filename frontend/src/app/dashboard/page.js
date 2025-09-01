import { getSales, getAnalytics } from "@/lib/data";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const [sales, analytics] = await Promise.all([getSales(), getAnalytics()]);

  return <DashboardClient sales={sales} analytics={analytics} />;
}