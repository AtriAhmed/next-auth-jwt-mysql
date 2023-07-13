import { NextResponse } from 'next/server'
import { sequelize } from '../../../models'
import { DataTypes } from 'sequelize'

const User = require('../../../models/user')(sequelize, DataTypes)
export async function GET() {
    const data = await User.findAll({})
    return NextResponse.json(data)

}