import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getFromStorage, setToStorage } from "../utils";

export default function useToggleDark(): [string, Dispatch<SetStateAction<string>>] {
  console.log(getFromStorage("theme"));

  const [dark, setDark] = useState(getFromStorage("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    const previous = dark === "dark" ? "light" : "dark";

    root.classList.remove(previous);
    root.classList.add(dark);

    setToStorage("theme", dark);
  }, [dark]);

  return [dark, setDark];
}
