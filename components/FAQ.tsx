"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

// Define types for FaqItem props
interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? "#FFF7ED" : "#FFFFFF" }}
      transition={{ duration: 0.3 }}
      className="border-b border-gray-200"
    >
      <button
        className="flex justify-between items-center w-full py-5 px-6 text-left text-lg font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="text-orange-500" size={24} />
        ) : (
          <ChevronDown className="text-gray-500" size={24} />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? "0px" : "-10px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
        className="px-6"
      >
        {isOpen && <p className="pb-5 text-gray-600">{answer}</p>}
      </motion.div>
    </motion.div>
  );
};

export default function FAQ() {
  // English FAQ Data with escaped apostrophes
  const faqData = [
    {
      question: "How do automatic reminders work?",
      answer:
        "You define rules (e.g., 15 days after the due date), and LoopBill automatically sends a personalized reminder email to your client if the invoice isn&apos;t marked as paid.",
    },
    {
      question: "Can I customize my invoices?",
      answer:
        "Yes! Depending on your plan, you can add your logo, choose colors, and even customize certain fields to match your brand identity.",
    },
    {
      question: "What payment methods are accepted for the subscription?",
      answer:
        "We accept major credit cards (Visa, Mastercard, American Express) through our secure payment partner, Stripe.",
    },
    {
      question: "Is bank connection possible?",
      answer:
        "Bank integration is not available at the moment but is on our roadmap. Currently, you can manually mark invoices as paid.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. Your data security is our priority. We use encrypted connections (HTTPS), secure databases, and follow best security practices.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
        >
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
