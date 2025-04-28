"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import { Menu, X, Construction, LogOut, LogIn } from "lucide-react";
import logo from "@/public/logo.png";

import EmailPopup from "./EmailPopup";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const controls = useAnimation();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  
  

  // Common props for ScrollLink to avoid repetition
  const scrollLinkProps = {
    smooth: true,
    duration: 500,
    spy: true, // Optional: highlights the link when scrolling to the section
    offset: -100, // Adjust this value based on your sticky header height + banner
    className: "hover:text-orange-500 transition-colors cursor-pointer", // Added cursor-pointer
  };

  // Mobile specific props
  const mobileScrollLinkProps = {
    ...scrollLinkProps,
    className:
      "block py-2 hover:text-orange-500 transition-colors cursor-pointer", // Mobile specific classes
    onClick: () => setIsMobileMenuOpen(false), // Close menu on click
  };

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      // Adjust offset based on sticky state if needed, more complex logic
      // For simplicity, using a fixed offset that accounts for the tallest state (banner + header)
      const newIsSticky = latest > 50;
      if (newIsSticky !== isSticky) {
        setIsSticky(newIsSticky);
        controls.start({ y: 0 }); // Keep controls logic if needed for other animations
      }
    });

    return () => unsubscribe();
    // Removed controls from dependency array if not strictly needed for offset calculation
  }, [scrollY, isSticky]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [status]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 ${
        isSticky ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial={{ opacity: 1, y: 0 }}
      animate={controls}
    >
      {/* Orange top banner */}
      <div className="w-full bg-orange-500 text-white py-2 text-center text-sm flex items-center justify-center space-x-2">
        <Construction size={16} className="text-yellow-400" />
        <span>LoopBill is new. Get the early adopter price!</span>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 flex-shrink-0"
            title="LoopBill Home"
          >
            <Image src={logo} alt="LoopBill Logo" width={32} height={32} />
            <span className="text-2xl font-bold text-orange-500">LoopBill</span>
          </Link>

          {/* Navigation Links - Centered */}
          <nav className="hidden md:flex flex-grow justify-center">
            <ul className="flex space-x-6">
              <li>
                <ScrollLink to="features" {...scrollLinkProps}>
                  Features
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="pricing" {...scrollLinkProps}>
                  Pricing
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="testimonials" {...scrollLinkProps}>
                  Testimonials
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="faq" {...scrollLinkProps}>
                  FAQ
                </ScrollLink>
              </li>
            </ul>
          </nav>
          <div className="hidden md:block">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => setIsPopupOpen(true)}>
              Keep in touch
            </Button>

          {/* Auth Buttons / User Info */}
          <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
            {status === "authenticated" ? (
              <div className="flex items-center space-x-2">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User avatar"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut()}
                  title="Sign Out"
                  className="hover:text-orange-500"
                >
                  <LogOut size={20} />
                </Button>
              </div>
            ) : status === "loading" ? (
              <div className="w-8 h-8"></div>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-orange-500 border-orange-500 hover:bg-orange-50"
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-gray-700 hover:text-orange-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <ScrollLink to="features" {...mobileScrollLinkProps}>
                  Features
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="pricing" {...mobileScrollLinkProps}>
                  Pricing
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="testimonials" {...mobileScrollLinkProps}>
                  Testimonials
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="faq" {...mobileScrollLinkProps}>
                  FAQ
                </ScrollLink>
              </li>
              {status === "authenticated" ? (
                <li>
                  <Button
                    className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white"
                    onClick={() => signOut()}
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </li>
              ) : status === "loading" ? (
                <li>{/* Optional: Loading state */}</li>
              ) : (
                <li>
                  <Link href="/login">
                    <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                      <LogIn size={16} className="mr-2" />
                      Login
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>)}
      </div>
      
      <EmailPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </motion.header>
  );
}
