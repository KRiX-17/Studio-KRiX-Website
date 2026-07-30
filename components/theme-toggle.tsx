"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="theme-toggle theme-toggle--loading"
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = `Switch to ${nextTheme} mode`;

  return (
    <button
      aria-label={label}
      className="theme-toggle"
      onClick={() => setTheme(nextTheme)}
      title={label}
      type="button"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
