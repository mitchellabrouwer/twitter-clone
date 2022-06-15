import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import useToggleDark from "../lib/hook/useToggleDark";

export default function ToggleDark() {
  const [theme, setTheme] = useToggleDark();

  return (
    <button>
      {theme === "dark" ? (
        <BsFillMoonFill onClick={() => setTheme("light")} />
      ) : (
        <BsFillSunFill onClick={() => setTheme("dark")} />
      )}
    </button>
  );
}
