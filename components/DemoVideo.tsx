"use client";

import { motion } from "framer-motion";

export default function DemoVideo() {
  // Replace with your hosted video URL (e.g., S3, Cloudinary, Vimeo)
  const videoSrc = "/placeholder-demo.mp4"; // Ensure you have a placeholder video in /public

  return (
    <section id="demo" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">See LoopBill in Action</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how to create, send, and track an invoice in under 60
            seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-xl aspect-video"
        >
          {/* 
            Notes on autoplay:
            - Usually works best with the `muted` attribute.
            - Some browsers might block autoplay under certain conditions.
            - `playsInline` is useful for mobile devices.
          */}
          <video
            className="w-full h-full object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
            <a href={videoSrc} download>
              Download the video
            </a>
          </video>
        </motion.div>
      </div>
    </section>
  );
}
