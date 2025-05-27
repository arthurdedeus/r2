"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Habits", href: "/habits" },
  { name: "Training", href: "/training" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="flex items-center">
      <div className="flex flex-shrink-0 items-center">
        <Link href="/" className="text-xl font-bold">
          R2
        </Link>
      </div>
      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
              pathname.startsWith(item.href)
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="flex items-center sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute left-0 top-16 z-50 w-full bg-background border-b sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                  pathname.startsWith(item.href)
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
