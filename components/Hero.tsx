"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import dashboard from "@/public/dashboard.png";

export default function Hero() {
  return (
    <section className="pt-40 pb-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
          >
            <h1 className="text-5xl font-bold mb-6">
              <span className="font-grotesk"><span className="font-serif">Automate </span> Your Invoicing, <br /> Get   </span>
              <span className="font-serif"> Paid Faster</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
              Focus on your craft, not paperwork. Automatically create, send,
              and follow up on invoices. Say goodbye to late payments!
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
                Start 14-Day Free Trial <ChevronRight className="ml-2" />
              </Button>
              <Button
                variant="outline"
                className="text-orange-500 border-orange-500 hover:bg-orange-50 text-lg px-8 py-3"
              >
                Watch Demo <PlayCircle className="ml-2" />
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 flex justify-center lg:justify-end"
          >
            <Image
              src={dashboard}
              alt="LoopBill automated invoicing dashboard preview"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
