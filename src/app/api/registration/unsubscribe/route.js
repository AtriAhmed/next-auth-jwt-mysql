import { NextResponse } from 'next/server'
import { sequelize } from '../../../../../models'
import { DataTypes } from 'sequelize'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../auth/[...nextauth]/route'

const Registration = require('../../../../../models/registration')(sequelize, DataTypes)
export async function POST(req) {
    const session = await getServerSession(req,
        {
            ...NextResponse,
            getHeader: (name) => NextResponse.headers?.get(name),
            setHeader: (name, value) => NextResponse.headers?.set(name, value),
        },
        authOptions)

    try {
        const deletedCount = await Registration.destroy({
            where: {
                userId: session.user.id
            },
          });
    
          if (deletedCount > 0) {
            // Unsubscription successful
            return NextResponse.json({ message: "Unsubscription successful" }, { status: 200 })
          } else {
            // No matching subscription found
            return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
          }
    } catch (error) {
        // Handle any errors that occur during user creation
        return NextResponse.json(error.message, { status: 400 })
    }

}