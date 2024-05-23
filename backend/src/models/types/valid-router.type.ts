import { TRoute } from "./route.type";


export type TValidRouter =
    TRoute extends `${string}/${infer R}`
    ? R | `/${R}` | `./${R}`
    : '';

