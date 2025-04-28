 // pages/login.tsx
"use client"; // Si vous utilisez Next.js 13+ App Router, sinon retirez

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assurez-vous que ce composant existe
import { Label } from '@/components/ui/label'; // Assurez-vous que ce composant existe
import { FcGoogle } from 'react-icons/fc'; // Pour l'icône Google
import { Mail, LogIn } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [authError, setAuthError] = useState<string | null>(null); // Pour les erreurs générales de NextAuth

  // Gestion des erreurs affichées par NextAuth via les query params
  useEffect(() => {
    if (router.query.error) {
      setAuthError(getFriendlyErrorMessage(router.query.error as string));
      // Optionnel: retire l'erreur de l'URL sans recharger la page
      router.replace('/login', undefined, { shallow: true });
    }
  }, [router.query.error, router]);

  // Redirige vers le tableau de bord si déjà connecté
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    await signIn('google', { callbackUrl: '/dashboard' });
    // setIsLoading(false); // Ne sera pas atteint si la redirection fonctionne
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');
    setAuthError(null);

    if (!email) {
      setEmailError('Email is required.');
      return;
    }
    // Validation simple d'email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn('email', { email, redirect: false, callbackUrl: '/dashboard' });
      if (res?.error) {
        setAuthError(getFriendlyErrorMessage(res.error));
      } else if (res?.ok) {
        // Redirection ou message de succès géré par NextAuth ou via callbackUrl
        // Normalement, après l'envoi du lien, l'utilisateur est sur une page "Vérifiez vos emails"
        // On peut afficher un message ici si on le souhaite.
        router.push(`/auth/verify-request?email=${encodeURIComponent(email)}`); // Page par défaut ou une page custom
      } else {
        // Cas inattendu
         setAuthError('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
        console.error("Sign in error:", error);
        setAuthError('An unexpected error occurred. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  // Fonction pour traduire les erreurs NextAuth
  const getFriendlyErrorMessage = (error: string): string => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return 'This email is already linked with another provider. Try logging in with that provider.';
      case 'EmailSignin': // Erreur potentielle lors de l'envoi
         return 'Could not send sign-in email. Please try again later.';
       case 'CredentialsSignin': // Si vous utilisiez des credentials
         return 'Invalid credentials. Please check your email or password.';
      // Ajoutez d'autres cas d'erreur spécifiques de NextAuth si nécessaire
      default:
        return 'Authentication failed. Please try again.';
    }
  };

  if (status === 'loading' || status === 'authenticated') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Ou un spinner
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-orange-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Image src={logo} alt="LoopBill Logo" width={40} height={40} />
            <span className="text-3xl font-bold text-orange-500 font-grotesk">LoopBill</span>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800 font-serif">Sign in to your account</h1>
        </div>

        {authError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{authError}</span>
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          {/* Google Sign-in */}
          <Button 
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50 text-gray-700"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <FcGoogle size={20} /> 
            <span>Sign in with Google</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email Sign-in Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`mt-1 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Sending link...' : <><Mail size={16} className="mr-2"/>Sign in with Email</>}
            </Button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account?
          {/* Mettre un lien vers une page d'inscription si elle existe, sinon retirer */}
          {/* <Link href="/signup" className="font-medium text-orange-600 hover:text-orange-500">
             Sign up
           </Link> */}
           For now, signing in will create one.
        </p>
      </div>
    </div>
  );
}
