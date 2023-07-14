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
                    return Promise.resolve(user);
                } else {
                    // Return null if the credentials are invalid
                    return Promise.resolve(null);
                }
            }
        })
    ],
    adapter: SequelizeAdapter(sequelize),
});

export { handler as GET, handler as POST }