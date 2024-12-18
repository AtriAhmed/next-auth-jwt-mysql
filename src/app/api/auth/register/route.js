import { NextResponse } from 'next/server'
import { sequelize } from '../../../../../models'
import { DataTypes } from 'sequelize'
// import { v4 as uuidv4 } from 'uuid';

const User = require('../../../../../models/user')(sequelize, DataTypes)
export async function POST(request) {
    const reqData = await request.json()
    console.log(reqData)
    const { name, email, password } = reqData

    try {
        // const id = uuidv4()
        const user = await User.create({ name, email, password, accessId: 1 })
        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        // Handle any errors that occur during user creation
        return NextResponse.json(error.message, { status: 400 })
    }

}