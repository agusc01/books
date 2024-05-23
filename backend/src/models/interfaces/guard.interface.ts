import { Request, Response } from "express";

export interface IGuard {
    (req: Request, res: Response, next: any): void;
}