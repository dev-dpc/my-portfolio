'use client'

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { IM_Fell_Double_Pica, Geist } from "next/font/google";

const imFellDoublePica = IM_Fell_Double_Pica({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-im-fell-double-pica',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

interface DashboardLayoutProps {
  children: React.ReactNode
}

// Map route segments to display names
const routeMap: Record<string, string> = {
  'dashboard-01': 'Dashboard',
  'team-overview' : 'Team Overview',
  'analytics': 'Analytics',
  'users': 'Users',
  'settings': 'Settings',
  'products': 'Products',
  'orders': 'Orders',
  'reports': 'Reports'
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  
  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = []
    
    breadcrumbs.push({
      href: '/dashboard-01',
      label: 'Dashboard',
      isLast: segments.length === 1
    })
    
    // Add subsequent segments
    if (segments.length > 1) {
      let currentPath = ''
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i]
        currentPath += `/${segment}`
        const fullPath = `/dashboard-01${currentPath}`
        
        breadcrumbs.push({
          href: fullPath,
          label: routeMap[segment] || segment,
          isLast: i === segments.length - 1
        })
      }
    }
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()

  return (
    <SidebarProvider className={`${geistSans.className} antialiased`}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.href} className="flex items-center">
                    {index > 0 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                    <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                      {crumb.isLast ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}