import { Book } from "../models/classes/book.class";
import { Env } from "../models/enums/env.enum";
import { envConfig } from "./env.config";

require('dotenv').config();

import mongoose from 'mongoose';
import { books } from "./insert-book";

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(String(envConfig(Env.MONGO_URI)));
        console.log('Se conecto MongoDB éxitosamente');
        await feed();
    }
    catch (error: any) {
        console.error('Error de conexión' + error.message);
        throw error;
    }
};


const feed = async (): Promise<void> => {
    try {
        const _books = await Book.find();
        if (_books.length === 0) {
            await Book.insertMany(books);
            console.log('Se agregaron los libros');
        }
    } catch (error) {
        console.error(error);
    }
};