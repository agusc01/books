import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { envConfig } from '../../config/env.config';
import { Env } from '../enums/env.enum';
import { IBook } from "../interfaces/book.interface";

export class Book extends Model<IBook> implements IBook {
    public id!: string;
    public img!: string;
    public price!: number;
    public title!: string;
    public year!: number;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: String(envConfig(Env.DB_TABLE_BOOKS)),
        timestamps: false,
    }
);