"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon, SystemIcon } from "@/components/icons";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const { resolvedTheme, setTheme, theme } = useTheme();

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="theme-toggle theme-toggle--loading"
      />
    );
  }

  const currentTheme = theme ?? "system";
  const nextTheme =
    currentTheme === "system"
      ? "light"
      : currentTheme === "light"
        ? "dark"
        : "system";
  const label = `Theme: ${currentTheme}. Switch to ${nextTheme} theme`;
  const icon =
    currentTheme === "system" ? (
      <SystemIcon />
    ) : resolvedTheme === "dark" ? (
      <MoonIcon />
    ) : (
      <SunIcon />
    );

  return (
    <button
      aria-label={label}
      className="theme-toggle"
      onClick={() => setTheme(nextTheme)}
      title={label}
      type="button"
    >
      {icon}
    </button>
  );
}
