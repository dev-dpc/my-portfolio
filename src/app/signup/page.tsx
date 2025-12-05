import { LoginForm } from "@/components/login-form"
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export default function LoginPage() {
  return (
    <div className={`${geistSans.className} antialiased bg-neutral-50 flex min-h-svh flex-col items-center justify-center p-6 md:p-10`}>
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}