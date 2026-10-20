import Link from "next/link";
import LoginForm from "../_components/LoginForm";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg ">

          {/* Form centric texts */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Wlcome Back!</h1>
            <p className="text-gray-500">Enter Your Credentials to Access Your Accout</p>
          </div>
          {/* Form */}
          <LoginForm></LoginForm>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Button asChild variant="link" className="h-auto p-0">
              <Link href="/register">Sign up</Link>
            </Button>
          </p>
        </div>
      </div>
    </>
  );
}
