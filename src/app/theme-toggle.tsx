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


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <section id="tabs-demo" className="flex w-full min-w-sm flex-col gap-6">
      <Tabs defaultValue="today">
        <TabsList className="dark:bg-gray-800">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="next_7">Next 7 Days</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>today</CardTitle>
              <CardDescription>
                Make changes to your today here. Click save when you&apos;re
                done. 
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="next_7">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>next_7</CardTitle>
              <CardDescription>
                Change your next_7 here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current next_7</Label>
                <Input id="tabs-demo-current" type="next_7" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New next_7</Label>
                <Input id="tabs-demo-new" type="next_7" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save next_7</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}
