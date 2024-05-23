import { ValidRouter } from "../types/valid-router.type";

export interface IConfirmSweet {
    title?: string;
    text: string;
    type: 'error' | 'success' | 'warning' | 'info' | 'question';
    newHref?: string;
    oldHref?: ValidRouter;
}