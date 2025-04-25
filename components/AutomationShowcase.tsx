"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AutomationShowcase() {
  const manualTasks = [
    { task: "Create and customize each invoice", time: "+ 15 min/invoice" },
    { task: "Send manually via email", time: "+ 5 min/invoice" },
    { task: "Track payments and deadlines", time: "+ 2-4h / month" },
    { task: "Follow up with late clients", time: "+ 1-2h / month" },
    { task: "Handle errors and oversights", time: "+ ∞ hours of stress" },
    { task: "Calculate VAT and totals", time: "Risk of errors" },
  ];

  const automatedFeatures = [
    "Create professional, customized invoices",
    "Automatic email sending (PDF included)",
    "Track statuses: sent / paid / overdue",
    "Smart automatic reminders",
    "Automated calculations and references",
    "Fewer errors, faster payments",
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 font-grotesk">
            Stop Wasting Time, Start Automating!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manual invoice management is time-consuming and error-prone.
            Discover how LoopBill transforms this process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Manual Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-red-50 p-8 rounded-lg shadow-md border border-red-200"
          >
            <h3 className="text-2xl font-semibold mb-6 text-red-700 text-center">
              ❌ The Manual Way
            </h3>
            <ul className="space-y-4">
              {manualTasks.map((item, index) => (
                <li key={index} className="flex items-start">
                  <XCircle
                    className="text-red-500 mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <span className="font-medium">{item.task}</span>
                    <span className="text-sm text-red-600 block">
                      {item.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-center text-red-700 font-bold text-xl mt-8">
              = Hours wasted & unnecessary stress 🤯
            </p>
          </motion.div>

          {/* Automated Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-green-50 p-8 rounded-lg shadow-md border border-green-200"
          >
            <h3 className="text-2xl font-semibold mb-6 text-green-700 text-center">
              ✅ With LoopBill
            </h3>
            <ul className="space-y-4">
              {automatedFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2
                    className="text-green-500 mr-3 flex-shrink-0"
                    size={20}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="text-center text-green-700 font-bold text-xl mt-8">
              = Time saved & cash flow optimized ✨
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
