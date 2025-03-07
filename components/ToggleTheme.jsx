"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const ToggleTheme = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" disabled></Button>;
  }

  const dark = (theme === "dark" || resolvedTheme === "dark");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
      className="hover:cursor-pointer hover:text-primary"
    >
      {dark ? (
        <Sun className="hover:cursor-pointer" />
      ) : (
        <Moon className="hover:cursor-pointer" />
      )}
    </Button>
  );
};

export default ToggleTheme;
