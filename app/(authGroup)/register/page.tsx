import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your details to register.
          </p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button asChild variant="link" className="h-auto p-0">
            <Link href="/login">Log in</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}