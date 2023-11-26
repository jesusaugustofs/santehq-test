import { useEffect } from "react";

type Ref<T> = { current: T | null };

export const useOutsideClick = <T extends HTMLElement>(
  ref: Ref<T>,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  });
};
