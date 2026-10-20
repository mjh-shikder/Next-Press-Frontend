import Link from "next/link";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  UserRound,
  UserRoundPen,
} from "lucide-react";
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

export type NavbarProps = {
  user: {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
      profile: {
        id: string;
        name: string;
        email: string;
        activeStatus: "ACTIVE" | "BLOCKED";
        role: "USER" | "ADMIN" | "AUTHOR"; 
        createdAT: string; 
        updatedAt: string; 
        profile: {
          id: string;
          profilePhoto: string;
          bio: string;
          userId: string;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
  };
};

const Navbar = ({ user }: NavbarProps) => {


  return (
    <header className="border-b bg-background">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="justify-self-start text-lg font-bold tracking-tight text-foreground"
        >
          Next Press
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-2 sm:gap-6"
        >
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
          {user?.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="icon"
                  aria-label="Open profile menu"
                  className="rounded-full"
                >
                  <UserRound aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
               
                <DropdownMenuLabel className="mb-0 pb-0"> <p className="font-bold text-lg">{user.data.profile.name}</p></DropdownMenuLabel>
                <DropdownMenuLabel className="mt-0 pt-0 ">{user.data.profile.email}</DropdownMenuLabel>
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
