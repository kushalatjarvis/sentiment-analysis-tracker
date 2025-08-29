import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="w-full py-6 px-2 sm:px-8 fixed top-0 z-50 bg-black text-primary-foreground">
      <nav className="sm:flex items-center justify-between w-full my-container">
        <Link
          className="text-2xl font-bold flex items-center justify-center gap-1"
          href="/"
        >
          <MessageSquarePlus className="size-8 mr-2 text-primary" />
        </Link>
        <div className="flex items-center gap-4">
          {/* <Button>Login</Button> */}
          {/* <Button>Signup</Button> */}
        </div>
      </nav>
    </header>
  );
};
