import DashboardClient from "./DashboardClient";

export async function generateMetadata({params}) {
  return {
    title: `Dashboard - Buy me a Chai`,
  };
}

export default function DashboardPage() {
  return <DashboardClient />;
}