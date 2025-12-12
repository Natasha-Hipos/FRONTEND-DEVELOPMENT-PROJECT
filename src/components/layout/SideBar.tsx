import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { HomeIcon, UsersIcon, Briefcase, } from "lucide-react"
import { ShieldCheck } from "lucide-react"
import "../../styles/Sidebar.css";

interface SidebarProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation()

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <HomeIcon size={24} className="text-blue-600" /> },
    { path: "/students", label: "Students", icon: <UsersIcon size={24} className="text-blue-600" /> },
    { path: "/employees", label: "Employees", icon: <Briefcase size={24} className="text-blue-600"/> },
  ]

  if (!isOpen) {
    return null
  }

  return (
      <aside className="h-screen shadow-lg transition-all fixed top-0 left-0 z-50 w-64 overflow-y-auto p-2 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-md">      {/* Centered Admin header */}
      <div className="flex flex-col items-center justify-center p-6">
        {/* Pick any Lucide icon you like, e.g. Shield */}
        <ShieldCheck size={30} className="text-blue-600" />
        <span className="mt-2 text-xl font-bold">Admin</span>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "hover:bg-blue-200 dark:hover:bg-gray-800 font-bold"
                : "hover:bg-blue-200 dark:hover:bg-gray-800 font-bold"
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12">{item.icon}</div>
            <span className="ml-3 text-lg font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

