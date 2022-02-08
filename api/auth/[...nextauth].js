import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { html, text } from '../../../utils/htmlEmail'
import nodemailer from "nodemailer"
import EmailProvider from "next-auth/providers/email";
export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    
    
    EmailProvider({
      // https://www.google.com/settings/security/lesssecureapps
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest ({
        identifier: email,
        url,
        SessionProvider: { server, from }
      }) {
        const { host } = new URL(url)
        const transport = nodemailer.createTransport(server)
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email }),
        })
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  // SQL or MongoDB database (or leave empty)
  database: process.env.DATABASE_URL,
  callbacks: {
    session: async (session, user) => {
      session.userId = user.sub
      return Promise.resolve(session)
    }
  }
})
