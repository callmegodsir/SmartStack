"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Using logo as placeholder as per current user setup
import user1 from "@/public/logo.png";
import user2 from "@/public/logo.png";
import user3 from "@/public/logo.png";

const testimonials = [
  {
    quote:
      "Incredible time saver! The automatic reminders saved me from numerous oversights and sped up my payments.",
    name: "Sophie Martin", // Kept original name examples
    title: "Freelance Graphic Designer",
    image: user1,
    rating: 5,
  },
  {
    quote:
      "Finally, a simple and effective solution for managing my invoices. The interface is intuitive, and the support is responsive.",
    name: "Ahmed Cherif",
    title: "IT Consultant",
    image: user2,
    rating: 5,
  },
  {
    quote:
      "I was skeptical at first, but LoopBill has truly simplified my accounting. Fewer errors and a better overview.",
    name: "Claire Dubois",
    title: "Shop Manager",
    image: user3,
    rating: 4,
  },
];

export default function MultipleTestimonials() {
  return (
    <section id="testimonials" className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Professionals Like You!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover why freelancers and SMBs choose LoopBill.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <Image
                src={testimonial.image}
                alt={`Photo of ${testimonial.name}`}
                width={80}
                height={80}
                className="rounded-full mb-4 border-2 border-orange-200"
              />
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  />
                ))}
                <span className="sr-only">
                  {testimonial.rating} out of 5 stars
                </span>
              </div>
              <p className="italic text-gray-700 mb-4 flex-grow font-serif">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-lg">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
