import { Suspense } from "react";
import Navbar from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import React from "react";

async function NavbarWithUser() {
  const user = await getMe();
  return <Navbar user={user} />;
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense
        fallback={
          <header className="h-16 border-b bg-background" aria-hidden="true" />
        }
      >
        <NavbarWithUser />
      </Suspense>
      {children}
    </div>
  );
};

export default DashboardLayout;
