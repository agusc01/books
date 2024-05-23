import { ISpanishTitles } from "../interfaces/spanish-titles.interface";

export type TToast = Exclude<keyof ISpanishTitles, 'question'>;