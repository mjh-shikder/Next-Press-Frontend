import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { LayoutDashboard, LogIn, LogOut, UserRound, UserRoundPen } from "lucide-react";
import { logoutAction } from "@/app/(authGroup)/_actions/authAction";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
];

const AuthControl = async () => {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("accessToken");

  return isLoggedIn ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open profile menu"
          className="rounded-full"
        >
          <UserRound aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard aria-hidden="true" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">
            <UserRoundPen aria-hidden="true" />
            Edit profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={logoutAction}>
          <DropdownMenuItem asChild variant="destructive">
            <button type="submit" className="w-full">
              <LogOut aria-hidden="true" />
              Log out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button asChild variant="outline" size="sm">
      <Link href="/login">
        <LogIn aria-hidden="true" />
        Login
      </Link>
    </Button>
  );
};

const Navbar = () => {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="justify-self-start text-lg font-bold tracking-tight text-foreground"
        >
          Next Press
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="justify-self-end">
          <Suspense
            fallback={<span aria-hidden="true" className="inline-block size-9" />}
          >
            <AuthControl />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Navbar;