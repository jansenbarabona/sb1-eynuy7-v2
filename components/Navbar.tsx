"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, User, LogOut, Globe, CreditCard, Phone, Camera, Bell, Upload, Check, AlertTriangle } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const notifications = [
    { id: 1, message: "Your booking with John Doe has been confirmed!", icon: <Check className="h-4 w-4 text-green-500" /> },
    { id: 2, message: "New message from your guide Sarah", icon: <Bell className="h-4 w-4 text-blue-500" /> },
    { id: 3, message: "Your upcoming trip to Paris is in 3 days", icon: <AlertTriangle className="h-4 w-4 text-yellow-500" /> },
  ]

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Explore the World</Link>
        <div className="flex items-center space-x-4">
          <Link href="/explore" className="hover:underline">Explore</Link>
          <Link href="/guides" className="hover:underline">Our Guides</Link>
          <Link href="/about" className="hover:underline">About Us</Link>
          <Link href="/become-member">
            <Button variant="outline" size="sm">
              Become a Member
            </Button>
          </Link>
          
          {/* Notification Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 px-1 py-0.5 text-xs">3</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex items-center p-3 cursor-pointer">
                  {notification.icon}
                  <span className="ml-2">{notification.message}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Icon */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="icon" className="absolute bottom-0 right-0 bg-white rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="mt-4 font-semibold">John Doe</h3>
                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>ID: 12345</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>United States</span>
                  </div>
                </div>
                <div className="w-full mt-4 space-y-2">
                  <Button variant="outline" className="w-full" onClick={() => router.push('/settings')}>
                    <CreditCard className="mr-2 h-4 w-4" /> Settings
                  </Button>
                  <Button variant="destructive" className="w-full" onClick={() => {
                    // Implement logout logic here
                    router.push('/login')
                  }}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar