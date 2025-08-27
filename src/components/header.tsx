import { FlagTriangleRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="w-full py-4 px-8 bg-black fixed top-0 z-50 text-primary-foreground">
      <nav className="max-w-8xl mx-auto flex items-center justify-between w-full">
        <Link
          className="text-2xl font-bold flex items-center justify-center gap-1"
          href="/"
        >
          <span className="">SAT</span>
          <FlagTriangleRight className="w-6 h-6 font-bold text-primary" />
        </Link>
        <div className="flex items-center gap-4">
          {/* <Button>Login</Button> */}
          {/* <Button>Signup</Button> */}
        </div>
      </nav>
    </header>
  );
};
