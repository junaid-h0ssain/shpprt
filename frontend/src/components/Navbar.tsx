import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import { PlusIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import ThemeController from "./ThemeController";

function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <div className="navbar bg-base-300">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4">
        {/* LOGO - LEFT SIDE */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost gap-2">
            <ShoppingBagIcon className="size-5 text-primary" />
            <span className="font-mono text-lg font-bold uppercase tracking-wider">
              Shpprt
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeController />
          {isSignedIn ? (
            <>
              <Link to="/create" className="btn btn-primary btn-sm gap-1">
                <PlusIcon className="size-4" />
                <span className="hidden sm:inline">New Product</span>
              </Link>
              <Link to="/profile" className="btn btn-ghost btn-sm gap-1">
                <UserIcon className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button type="button" className="btn btn-ghost btn-sm">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button type="button" className="btn btn-primary btn-sm">
                  Get Started
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
