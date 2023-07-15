import NextAuth from "next-auth";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { sequelize } from '../../../../../models'
import { DataTypes } from 'sequelize'
import CredentialsProvider from "next-auth/providers/credentials"

const User = require('../../../../../models/user')(sequelize, DataTypes)

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/configuration/auth-config
const handler = NextAuth({
    // https://authjs.dev/reference/providers/
    providers: [
        CredentialsProvider({
            // The name to display on the sign-in form (e.g., "Sign in with Email")
            name: 'Credentials',
            // Function that verifies credentials and returns a user object
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                console.log(credentials)
                // Here you would implement your own logic to check if the credentials are valid
                const { email, password } = credentials;
                const user = await User.findOne({ where: { email } });
                if (user && user.password === password) {
                    // Return the user object if the credentials are valid
                    return user;
                } else {
                    // Return null if the credentials are invalid
                    return null;
                }
            }
        })
    ],
    adapter: SequelizeAdapter(sequelize),
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "jwt",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

    },
    callbacks: {
        session: ({ session, token }) => {
            console.log(token, session, user);
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                },
            }
        },
    },

    pages: {
        signIn: '/auth/signin',
        signUp: '/auth/signup',
    }
});

export { handler as GET, handler as POST, handler as authOptions }