import { Home, MapPin, Users, Building, FileText, GraduationCap, UserCheck, House, Truck, Cog, ClipboardList, Search, LogOut, DollarSign } from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const adminNavigationItems = [
  { title: "Home", url: "/", icon: House },
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Village Onboarding", url: "/village-onboarding", icon: MapPin },
  { title: "Add VLE Profile", url: "/vle-onboarding", icon: UserCheck },
  { title: "Add Vendor", url: "/vendor-onboarding", icon: Truck },
  { title: "Register Machine", url: "/machine-registration", icon: Cog },
  { title: "Conduct a Survey", url: "/conduct-survey", icon: ClipboardList },
  { title: "Survey Results", url: "/survey-results", icon: ClipboardList },
  { title: "Villages in Scope", url: "/top-villages", icon: Search },
]

const vleNavigationItems = [
  { title: "Home", url: "/", icon: House },
  { title: "Log Income", url: "/log-income", icon: DollarSign },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const navigationItems = user?.role === 'admin' ? adminNavigationItems : vleNavigationItems

  const isActive = (path: string) => currentPath === path

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">🌾</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Reaching Roots</h1>
                <p className="text-xs text-gray-600">Village Data System</p>
              </div>
            )}
          </div>
        </div>

        {user && !isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const active = isActive(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={`
                          flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-200
                          ${active 
                            ? 'bg-emerald-700 text-white font-semibold shadow-sm border-l-4 border-l-emerald-400' 
                            : 'text-gray-700 bg-transparent hover:bg-emerald-100 hover:text-emerald-700'
                          }
                        `}
                      >
                        <item.icon className={`h-4 w-4 ${active ? 'text-white' : 'text-gray-600'}`} />
                        {!isCollapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <div className="mt-auto p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
