import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import MainNav from "./MainNav";

export default function MainHeader() {
  return (
    <header className="py-4 px-6">
      <div className="mx-auto max-w-6xl flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Acceloka
        </Link>
        <nav>
          <div className="flex gap-8 items-center">
            <MainNav />
            <ToggleTheme />
          </div>
        </nav>
      </div>
    </header>
  );
}
