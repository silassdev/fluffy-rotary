import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { UserModel } from '@/app/api/';
import MongoDBClient from '../mongodb/client';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || '';
      }
      return session;
    },
    async signIn({ user }) {
      try {
        await MongoDBClient.getInstance().connect();
        const userModel = new UserModel();
        
        const dbUser = await userModel.findOrCreateUser(
          user.email || '',
          user.name || '',
          user.image
        );
        
        return true;
      } catch (error) {
        console.error('SignIn error:', error);
        return false;
      }
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};