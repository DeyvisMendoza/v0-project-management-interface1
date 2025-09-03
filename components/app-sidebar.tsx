"use client"

import {
  Building2,
  FolderOpen,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Users,
  FileText,
  Calendar,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  {
    title: "Panel Principal",
    url: "/",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Proyectos",
    url: "/proyectos",
    icon: Building2,
    badge: "12",
  },
  {
    title: "Proveedores",
    url: "/proveedores",
    icon: Users,
    badge: null,
  },
  {
    title: "Documentos",
    url: "/documentos",
    icon: FolderOpen,
    badge: "3",
  },
  {
    title: "Finanzas",
    url: "/finanzas",
    icon: DollarSign,
    badge: null,
  },
  {
    title: "Calendario",
    url: "/calendario",
    icon: Calendar,
    badge: null,
  },
  {
    title: "Reportes",
    url: "/reportes",
    icon: TrendingUp,
    badge: null,
  },
]

const adminItems = [
  {
    title: "Configuración",
    url: "/configuracion",
    icon: Settings,
  },
  {
    title: "Auditoría",
    url: "/auditoria",
    icon: FileText,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">ProyectoHub</h2>
            <p className="text-sm text-muted-foreground">Sistema de Gestión</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground text-center">
          <p>© 2024 ProyectoHub</p>
          <p>Versión 2.1.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
