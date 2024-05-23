import { TSweet } from "../types/sweet.type";

export interface IAlert {
    title?: string;
    text: string;
    type: TSweet;
    timer?: number;
}