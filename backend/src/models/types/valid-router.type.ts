import { Route } from "./route.type";


export type ValidRouter =
    Route extends `${string}/${infer R}`
    ? R | `/${R}` | `./${R}`
    : '';

