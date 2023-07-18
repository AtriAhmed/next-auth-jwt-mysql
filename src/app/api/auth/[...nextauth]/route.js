import NextAuth from "next-auth";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { sequelize } from '../../../../../models'
import { DataTypes } from 'sequelize'
import CredentialsProvider from "next-auth/providers/credentials"
import jwt from 'jsonwebtoken';

const User = require('../../../../../models/user')(sequelize, DataTypes)

const authOptions =  {providers: [
    CredentialsProvider({
        // The name to display on the sign-in form (e.g., "Sign in with Email")
        name: 'Credentials',
        // Function that verifies credentials and returns a user object
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
        },
        authorize: async (credentials) => {
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
        return {
            ...session,
            user: {
                ...session.user,
                id: token.sub,
                accessId: token.accessId
            },
        }
    },
},
jwt:{
encode: async ({ secret, token}) => {
    // Fetch user data from the database using Sequelize
    const user = await User.findOne({ where: { email: token.email } });

    // Include additional user data in the token
    const payload = {
      ...token,
      userId: user.id,
      accessId: user.accessId
      // Include any other user data you want in the token
    };
    //console.log(payload)

    // Encode the token using your custom encode function
    const encodedToken = jwt.sign(payload, secret);
    return encodedToken;
  },
  decode: async ({ secret, token }) => {
    // Decode the token using your custom decode function
    const decodedToken = jwt.verify(token, secret);
    // Fetch user data from the database using Sequelize
    const user = await User.findOne({ where: { id: decodedToken.userId } });

    // Include additional user data in the session object
    const session = {
      ...decodedToken,
      user: {
        ...decodedToken.user,
        ...user.toJSON(),
        // Include any other user data you want in the session object
      },
    };
//console.log(session)
    return session;
  },
},
pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
}
}
// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/configuration/auth-config
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions }