import { TToast } from "../types/toast.type";

export interface IToast {
    title?: string;
    text: string;
    type: TToast;
    timer?: number;
}