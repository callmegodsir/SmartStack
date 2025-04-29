"use client";


import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import dashboard from "@/public/dashboard.png";
import { useState, useEffect } from "react";
import EmailPopup from "./EmailPopup";
import {
  useNotifications,
  NotificationAppType,
} from "../components/NotificationSystem";

export default function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);



  // Récupérer showNotification ET clearNotifications
  const { showNotification, clearNotifications } = useNotifications();

  useEffect(() => {
    // Données des notifications à afficher
    const notificationsToShow = [
      {
        appType: "gmail" as NotificationAppType,
        title: "Pierre Quiroule",
        message: "Add VAT to invoice now!",
        timeAgo: "1m",
        duration: 6000,
      },
      {
        appType: "whatsapp" as NotificationAppType,
        title: "Rappel RDV",
        message: "Votre coiffeur demain à 10h.",
        timeAgo: "5m",
        duration: 6000,
      },
      {
        appType: "stripe" as NotificationAppType,
        title: "Paiement reçu",
        message: "Facture #2024-07A payée (150€)",
        timeAgo: "1h",
        duration: 6000,
      },
      {
        appType: "mcdonalds" as NotificationAppType,
        title: "Your order just arrived!",
        message: "It's your 13th BigMama order this month! 🍔",
        timeAgo: "now",
        duration: 6000,
      },
    ];

    // Créer les timeouts pour afficher les notifications séquentiellement
    const timeouts = notificationsToShow.map(
      (notification, i) =>
        setTimeout(
          () => {
            // Vérifier si le composant est toujours monté (bonne pratique, même si ici le cleanup gère)
            showNotification(notification);
          },
          2000 * (i + 1)
        ) // Délai entre chaque notification (ex: 2 secondes)
    );

    // Fonction de nettoyage qui s'exécute lorsque le composant Hero est démonté
    return () => {
      // 1. Annuler tous les timeouts qui n'ont pas encore été déclenchés
      timeouts.forEach(clearTimeout);
      // 2. Effacer toutes les notifications actuellement affichées
      clearNotifications();
    };
  }, []);
  return (
    <section className="pt-40 pb-20 bg-gradient-to-b from-white to-orange-50 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
          >
            <h1 className="text-5xl font-bold mb-6">
              <span className="font-grotesk">
               Automate Your  <span className="font-serif">Invoicing, </span>{" "}
                <br /> Get{" "}
              </span>
              <span className="font-serif"> Paid Faster</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
              Focus on your craft, not paperwork. Automatically create, send,
              and follow up on invoices. Say goodbye to late payments!
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3" onClick={() => setIsPopupOpen(true)} id="keepInTouch">
                Keep in touch !
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
        
        <EmailPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      
      </div>
    </section>
  );
}
