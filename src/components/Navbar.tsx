import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
    return (
      <nav className="bg-white text-dark dark:bg-gray-900 dark:text-light p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-400">Sales Insights Portal</h1>
        <ToggleTheme />
      </nav>
    );
  }
  