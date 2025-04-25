"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section
      id="cta-final"
      className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6 font-serif">
            Ready to Save Time and Money?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of professionals automating their invoicing with
            LoopBill. Try it free for 14 days, no commitment.
          </p>
          <Button className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-10 py-4 font-semibold">
            Start My Free Trial <ChevronRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
