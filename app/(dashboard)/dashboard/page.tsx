import { Metadata } from "next";
import { brand } from "@/lib/constants/brand";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";

export const metadata: Metadata = {
  title: `Dashboard | ${brand.name}`,
  description: brand.description,
};

export default function DashboardPage() {
  return <DashboardWrapper />;
}
