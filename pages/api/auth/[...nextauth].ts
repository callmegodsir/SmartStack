import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import connectMongo from "@/libs/mongo";
import config from "@/config";
import { Resend } from "resend";

interface NextAuthOptionsExtended extends NextAuthOptions {
  adapter: any;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptionsExtended = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name ? profile.given_name : profile.name,
          email: profile.email,
          image: profile.picture,
          createdAt: new Date(),
        };
      },
    }),
    EmailProvider({
      maxAge: 24 * 60 * 60,
      async sendVerificationRequest({ identifier: email, url, provider }) {
        try {
          const { data, error } = await resend.emails.send({
            from: config.mailgun.fromNoReply,
            to: [email],
            subject: `Sign in to LoopBill`,
            html: `<p>Click the magic link below to sign in to your account:</p>\n<p><a href="${url}"><b>Sign In</b></a></p>`,
          });

          if (error) {
            console.error("Resend Error:", error);
            throw new Error(`Email could not be sent: ${error.message}`);
          }
        } catch (error) {
          console.error("Failed to send verification email:", error);
          throw new Error("Failed to send verification email.");
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(connectMongo as any),
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    brandColor: config.colors.main,
    logo: `https://${config.domainName}/logoAndName.png`,
  },
};

export default NextAuth(authOptions);
