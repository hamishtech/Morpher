import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { supabase } from "../../../utils/supabaseClient";

export default NextAuth({
  providers: [
    Providers.Twitter({
      clientId: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY,
      clientSecret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET,
    }),
  ],

  callbacks: {
    async signIn(user, account, profile) {
      const { data, error } = await supabase.from("users").insert(
        [
          {
            id: account.id,
            access_token: account.accessToken,
            access_secret: account.refreshToken,
          },
        ],
        { returning: "minimal" },
        { upsert: true }
      );
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session(session, user) {
      session.userID = user.sub;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    },
  },
});
