"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Construction } from "lucide-react";
import logo from "@/public/logo.png";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const controls = useAnimation();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 50) {
        setIsSticky(true);
        controls.start({ y: 0 });
      } else {
        setIsSticky(false);
        controls.start({ y: 0 });
      }
    });

    return () => unsubscribe();
  }, [scrollY, controls]);

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
        <span>
          LoopBill is recent. Get the early adopter price!
        </span>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-2"
            title="LoopBill Home"
          >
            <Image src={logo} alt="LoopBill Logo" width={32} height={32} />
            <span className="text-2xl font-bold text-orange-500">LoopBill</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="#features"
                  className="hover:text-orange-500 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-orange-500 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="hover:text-orange-500 transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="hover:text-orange-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
          <div className="hidden md:block">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Start Free Trial
            </Button>
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
                <Link
                  href="#features"
                  className="block py-2 hover:text-orange-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="block py-2 hover:text-orange-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="block py-2 hover:text-orange-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="block py-2 hover:text-orange-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                  Start Free Trial
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
