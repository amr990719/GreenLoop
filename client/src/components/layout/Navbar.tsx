import { Link, useLocation } from "wouter";
import { Recycle, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recyclers", label: "Find Recyclers" },
    { href: "/join/recycler", label: "For Recyclers" },
    { href: "/join/waste-picker", label: "For Waste Pickers" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                <Recycle className="h-6 w-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                GreenLoop
              </span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/recyclers">
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-10">
                  <Link href="/">
                    <a className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <Recycle className="h-6 w-6 text-primary" />
                      <span className="font-display font-bold text-xl">GreenLoop</span>
                    </a>
                  </Link>
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <a
                          onClick={() => setIsOpen(false)}
                          className={`text-lg font-medium transition-colors ${
                            isActive(link.href) ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {link.label}
                        </a>
                      </Link>
                    ))}
                    <Link href="/recyclers">
                      <Button className="w-full mt-4 bg-primary" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
