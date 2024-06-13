import { Schema, model } from 'mongoose';
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>({

    img: {
        type: String,
        required: false,
        unique: false,
    },
    price: {
        type: Number,
        required: false,
        unique: false,
    },
    title: {
        type: String,
        required: false,
        unique: false,
    },
    year: {
        type: Number,
        required: false,
        unique: false,
    },
}, {
    timestamps: false,
    versionKey: false,
    collection: 'books'
});

export const Book = model<IBook>('Book', bookSchema);