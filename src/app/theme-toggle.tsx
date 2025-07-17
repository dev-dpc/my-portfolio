'use client';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';
import Link from "next/link";

export function ThemeToggle(){
    const {theme, setTheme} = useTheme();
    return(
        <div className="fixed bottom-0 right-4 z-50">
            <Button
                variant="outline"
                size="icon"
                className="rounded-full cursor-pointer"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
                <FaSun className="absolute h-10 w-10 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                <FaMoon className="absolute h-10 w-10 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
            </Button>
        </div>

    );
}

export function ButtonOne() {
  return <Button className="cursor-pointer" onClick={() => console.log('Button 1 clicked')}>Button 1</Button>;
}

export function ButtonTwo() {
    
  return <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Button 2 (Hover)</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Hover text</p>
      </TooltipContent>
    </Tooltip>;
}

export function LinkAsButton() {
  return (
    <Button asChild>
      <Link href="#">Login</Link>
    </Button>
  )
}