import React, { useEffect, useState } from "react";

interface Debounce {
  value: string | null;
  time?: number;
}
export const useDebounce = ({ value, time = 1000 }: Debounce) => {
  const [valueDebounce, setValueDebounce] = useState<null | string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setValueDebounce(value);
    }, time);

    return () => clearTimeout(timer);
  }, [value]);

  return valueDebounce;
};
