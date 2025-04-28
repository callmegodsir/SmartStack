"use client"; 

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Protection côté client
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard"); // Redirige vers login si pas connecté
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-4 font-serif">
            Welcome to your Dashboard, {session.user?.name || "User"}!
          </h1>
          <p className="mb-6 text-gray-700">
            This is your protected dashboard area.
          </p>
          {session.user?.email && (
            <p className="text-sm text-gray-500 mb-6">
              Logged in as: {session.user.email}
            </p>
          )}
          <Button
            onClick={() => signOut({ callbackUrl: "/" })} // Déconnecte et redirige vers l'accueil
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  // Au cas où status n'est ni loading, ni authenticated (peu probable ici)
  return null;
}

// Alternative: Protection côté serveur (plus robuste)
// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login?callbackUrl=/dashboard',
//         permanent: false,
//       },
//     };
//   }
//
//   return {
//     props: { session }, // Passe la session aux props de la page
//   };
// }
