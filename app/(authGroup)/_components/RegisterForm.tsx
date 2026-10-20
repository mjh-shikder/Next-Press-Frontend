"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction, type RegisterState } from "../_actions/authAction";

const RegisterForm = () => {
  const initialState: RegisterState = { success: false, message: "" };
  const [state, action, pending] = useActionState(registerAction, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={action}>
      <Card className="space-y-5 p-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            autoComplete="name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Choose a password"
            autoComplete="new-password"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profilePhoto">Profile photo URL</Label>
          <Input
            id="profilePhoto"
            name="profilePhoto"
            type="text"
            placeholder="https://example.com/photo.jpg"
            autoComplete="url"
            required
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Choose a role</legend>
          <div className="flex gap-5">
            <Label className="cursor-pointer font-normal">
              <input
                className="accent-primary"
                type="radio"
                name="role"
                value="USER"
                defaultChecked
              />
              User
            </Label>
            <Label className="cursor-pointer font-normal">
              <input
                className="accent-primary"
                type="radio"
                name="role"
                value="AUTHOR"
              />
              Author
            </Label>
          </div>
        </fieldset>

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;