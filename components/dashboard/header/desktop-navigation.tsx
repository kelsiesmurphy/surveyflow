"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "@/components/ui/button";
import { Unauthenticated, Authenticated } from "convex/react";
import CustomUserButton from "@/components/custom-user-button";

export default function DesktopNavigation() {
  return (
    <div className="hidden md:flex items-center gap-x-3">
      <Unauthenticated>
        <div className="flex items-center gap-x-2">
          <SignInButton>
            <Button variant="outline" size="sm">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button size="sm">Sign up</Button>
          </SignUpButton>
        </div>
      </Unauthenticated>

      <Authenticated>
        <CustomUserButton />
      </Authenticated>
    </div>
  );
}
