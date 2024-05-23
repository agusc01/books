import { TSweet } from "../types/sweet.type";
import { TValidRouter } from "../types/valid-router.type";

export interface IConfirmSweet {
    title?: string;
    text: string;
    type: TSweet;
    newHref?: string;
    oldHref?: TValidRouter;
}