import { Suspense } from "react";
import Navbar from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import type { ReactNode } from "react";

async function NavbarWithUser() {
  const user = await getMe();
  return <Navbar user={user} />;
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <header className="h-16 border-b bg-background" aria-hidden="true" />
        }
      >
        <NavbarWithUser />
      </Suspense>
      {children}
    </>
  );
}
