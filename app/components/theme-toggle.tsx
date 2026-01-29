"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { Button } from "./ui/button";

const THEME_TOGGLE_KEY = "i";
const THEME_TOGGLE_META = true; // Cmd on Mac, Win on Windows

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        (THEME_TOGGLE_META ? event.metaKey : event.ctrlKey) &&
        event.key.toLowerCase() === THEME_TOGGLE_KEY
      ) {
        event.preventDefault();
        toggleTheme();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="size-9 shrink-0 rounded p-0"
      aria-label={
        resolvedTheme === "dark"
          ? "Switch to light mode (⌘I)"
          : "Switch to dark mode (⌘I)"
      }
      title={
        resolvedTheme === "dark"
          ? "Switch to light mode (⌘I)"
          : "Switch to dark mode (⌘I)"
      }
    >
      {resolvedTheme === "dark" ? (
        <svg
          className="size-4"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      ) : (
        <svg
          className="size-4"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.867.53-3.562 1.432-4.634a9.75 9.75 0 0116.07 4.634z"
          />
        </svg>
      )}
    </Button>
  );
}
