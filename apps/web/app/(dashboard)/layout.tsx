
import { DashBoardLayout } from "@/modules/dashboard/ui/layouts/dashboard-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <DashBoardLayout>
            {children}
      </DashBoardLayout>
  );
}