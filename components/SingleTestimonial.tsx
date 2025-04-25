"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Using logo as placeholder as per current user setup
import userImage from "@/public/logo.png";
import proofImage from "@/public/logo.png";

export default function SingleTestimonial() {
  return (
    <section id="testimonial" className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center"
        >
          <div className="md:w-2/3 md:pr-8 text-center md:text-left mb-6 md:mb-0">
            <p className="text-2xl italic text-gray-700 mb-6">
              "Since using LoopBill, I spend less than 5 minutes a week on
              invoicing, down from several hours before. The automatic reminders
              have reduced my overdue payments by 70%!"
            </p>
            <div className="flex items-center justify-center md:justify-start">
              <Image
                src={userImage}
                alt="Photo of John Doe"
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <div>
                {/* Using generic English name/title */}
                <p className="font-semibold text-lg">John Doe</p>
                <p className="text-gray-600">Freelance Web Developer</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <Image
              src={proofImage}
              alt="Proof of time saved with LoopBill"
              width={200}
              height={150}
              className="rounded-md shadow-md"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
