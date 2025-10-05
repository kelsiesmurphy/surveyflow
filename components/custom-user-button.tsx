import { UserButton } from "@clerk/nextjs";
import { MonitorSmartphone } from "lucide-react";
import React from "react";

export default function CustomUserButton() {
  return (
    <div className="flex-1 flex justify-center">
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Dashboard"
            href="/dashboard"
            labelIcon={<MonitorSmartphone size={16} />}
          />
          <UserButton.Action label="manageAccount" />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
}
