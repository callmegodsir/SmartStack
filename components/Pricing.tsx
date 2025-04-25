"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Freelancer",
      price: "€19",
      billing: "per month",
      features: [
        "Up to 20 invoices / month",
        "Up to 10 clients",
        "Standard invoice templates",
        "Automatic email sending",
        "Manual reminders",
        "Email support",
      ],
      cta: "Choose Freelancer",
    },
    {
      name: "Pro",
      price: "€49",
      billing: "per month",
      features: [
        "Up to 100 invoices / month",
        "Up to 50 clients",
        "Customizable templates (logo)",
        "Email sending & open tracking",
        "Automatic reminders (1 level)",
        "Invoice statuses (paid, overdue)",
        "Priority support (email & chat)",
      ],
      cta: "Choose Pro",
      popular: true,
    },
    {
      name: "Business",
      price: "€99",
      billing: "per month",
      features: [
        "Unlimited invoices",
        "Unlimited clients",
        "Advanced customization (colors, fields)",
        "API access (coming soon)",
        "Multi-level automatic reminders",
        "Accounting export",
        "Dedicated support",
      ],
      cta: "Choose Business",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Simple Pricing for Your Growing Business
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your current needs, and scale up
            easily.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white p-8 rounded-lg shadow-md text-center flex flex-col ${
                plan.popular ? "border-2 border-orange-500" : ""
              }`}
            >
              {plan.popular && (
                <span className="bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 inline-block">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-4 font-serif">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold text-orange-500 mb-2">
                {plan.price}
              </p>
              <p className="text-gray-600 mb-6">{plan.billing}</p>
              <ul className="mb-8 space-y-3 text-left flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2
                      className="text-green-500 mr-2 mt-1 flex-shrink-0"
                      size={20}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full mt-auto ${
                  plan.popular
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-800 hover:bg-gray-900"
                } text-white`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
