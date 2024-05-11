import { Request, Response } from "express";

export interface IHandlerResponse {
    (req: Request, res: Response): void;
}