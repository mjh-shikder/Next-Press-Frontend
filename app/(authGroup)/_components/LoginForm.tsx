"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useActionState, useEffect } from "react";
import { loginAction, type LoginState } from "../_actions/authAction";
import { toast } from "sonner";

const LoginForm = () => {
  const initialState: LoginState = { success: false, message: "" };
  const [state, action, pending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) { 
      toast.success(state.message || "Login Successful")
    } else {
      toast.error(state.message || "Login Failed")
    }

   }, [state])

  return (
    <form action={action} className="space-y-4 ">
      <Card className="p-5 space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <Button type="submit">
          { pending ? "Submitting..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;
