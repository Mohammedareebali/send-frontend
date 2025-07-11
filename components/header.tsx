import { Bell, User } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md">
      <h2 className="text-2xl font-semibold text-white">Admin Dashboard</h2>
      <div className="flex items-center">
        <button className="p-1 mr-4 text-gray-400 hover:text-white focus:outline-none">
          <Bell className="w-6 h-6" />
        </button>
        <button className="flex items-center text-sm focus:outline-none">
          <User className="w-8 h-8 mr-2 rounded-full bg-gray-700 p-1" />
          <span className="hidden md:block font-medium">Admin User</span>
        </button>
      </div>
    </header>
  )
}
