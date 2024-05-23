import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { envConfig } from '../../config/env.config';
import { Env } from '../enums/env.enum';
import { IUser } from '../interfaces/user.interface';

export class User extends Model<IUser> implements IUser {
    public id!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: String(envConfig(Env.DB_TABLE_USERS)),
        timestamps: false,
    }
);