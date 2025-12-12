import type React from "react"
import { FaBell, FaUserCircle } from "react-icons/fa"
import { LogOutIcon, MenuIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Dropdown from "../ui/DropDown"
import ThemeToggle from "../ui/ThemeToggle"


interface TopNavProps {
  theme: string
  setTheme: (theme: string) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TopNav: React.FC<TopNavProps> = ({ theme, setTheme, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate()

  const menuItems = [
    { path: "/", label: "Dashboard" },
    { path: "/students", label: "Students" },
    { path: "/employees", label: "Employees" },
  ]

  return (
    <header className="relative z-40 p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-1">
        {/* toggle sidebar (visible on md+) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden md:flex items-center justify-center w-10 h-10 hover:bg-gray-200 dark:hover:bg-gray-800 transition rounded-lg"
        >
          <MenuIcon size={24} />
        </button>

        {/* Mobile: hamburger dropdown (appears under the hamburger on the left) */}
        <div className="relative z-[9999] md:hidden overflow-visible">
          <Dropdown
            id="hamburger-mobile"
            className="w-48"
            align="left"
            buttonContent={
              <button className="flex items-center justify-center w-10 h-10 hover:bg-gray-200 dark:hover:bg-gray-800 transition rounded-lg">
                <MenuIcon size={24} className="text-gray-700 dark:text-gray-100" />
              </button>
            }
          >
            <div className="bg-gray dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Admin</h3>
              </div>

              <ul>
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Dropdown>
        </div>

        <img src="/src/assets/stuem.png" alt="STUEM Logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold">STUEM DIRECTORY</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-6 sm:space-x-4 xs:space-x-2">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>

        <div className="relative">
          <Dropdown id="notifications" buttonContent={<FaBell className="text-2xl cursor-pointer text-gray-700 dark:text-gray-100" />}>
            <div className="p-3 bg-gray dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
               <h3 className="text-sm font-semibold">Notifications</h3>
             </div>
            <ul className="max-h-64 overflow-y-auto bg-gray dark:bg-gray-800 text-gray-900 dark:text-gray-100">
               <li className="px-4 py-3 text-center">No new notifications</li>
             </ul>
           </Dropdown>
        </div>
        
        {/* Profile dropdown (visible on all screen sizes) */}
        <div className="relative">
          <Dropdown
            id="profile"
            buttonContent={
              <FaUserCircle className="text-2xl cursor-pointer text-gray-700 dark:text-gray-100" />
            }
          >
            <ul className="bg-gray dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <li>
                <Link
                  to="/log-out"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <LogOutIcon size={16} /> <span>Logout</span>
                  </div>
                </Link>
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}

export default TopNav