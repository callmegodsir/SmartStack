import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2"
              title="LoopBill Home"
            >
              <Image src={logo} alt="LoopBill Logo" width={32} height={32} />
              <span className="text-2xl font-bold text-orange-500">
                LoopBill
              </span>
            </Link>
            <p className="text-gray-300">Automate your invoicing, simply.</p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal-notice"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} LoopBill. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
