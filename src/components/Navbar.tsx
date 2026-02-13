import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white text-dark dark:bg-gray-900 dark:text-light p-4 shadow-md flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-green-400">
        Sales Insights Portal
      </Link>
      <div className="flex items-center gap-4">
        {session && (
          <>
            <Link
              href="/manage"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-400 transition"
            >
              Manage
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-400 transition"
            >
              Sign Out
            </button>
          </>
        )}
        {!session && (
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-400 transition"
          >
            Sign In
          </Link>
        )}
        <ToggleTheme />
      </div>
    </nav>
  );
}
