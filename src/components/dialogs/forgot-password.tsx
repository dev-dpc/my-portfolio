import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// font
import { Geist } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export function ForgotPassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a
          href="#"
          className="text-sm underline-offset-2 hover:underline"
        >
          Forgot your password?
        </a>
      </DialogTrigger>

      <DialogContent className={`${geistSans.className} antialiased sm:max-w-[425px]`}>
        <form className="space-y-4">
          <DialogHeader>
            <DialogTitle>Forgot your password?</DialogTitle>
            <DialogDescription>
              No worries, we&apos;ll send you reset instructions.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="Enter your email address" />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Reset password</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
