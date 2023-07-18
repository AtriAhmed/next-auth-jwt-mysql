import { NextResponse } from 'next/server'
import { sequelize } from '../../../../../models'
import { DataTypes } from 'sequelize'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../auth/[...nextauth]/route'

const Registration = require('../../../../../models/registration')(sequelize, DataTypes)
export async function GET(req) {
    const session = await getServerSession(req,
        {
            ...NextResponse,
            getHeader: (name) => NextResponse.headers?.get(name),
            setHeader: (name, value) => NextResponse.headers?.set(name, value),
        },
        authOptions)
    try {
        const inscription = await Registration.findOne({
            where: {
              userId: session.user.id,
            },
          });
          const isUserSubscribed = !!inscription;
        return NextResponse.json({ isSubscribed: isUserSubscribed }, { status: 200 })
    } catch (error) {
        // Handle any errors that occur during user creation
        return NextResponse.json(error.message, { status: 400 })
    }

}
