import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

interface LightSwitchProps {
  className?: string;
}
export default function LightSwitch({ className }: LightSwitchProps) {
  const { theme, setTheme } = useTheme();
  const toggleMode = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <Button
      onClick={toggleMode}
      variant="outline"
      size="icon"
      className={className}
    >
      <i className="icon-[ant-design--sun-outlined] absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <i className="icon-[ant-design--moon-outlined] absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
