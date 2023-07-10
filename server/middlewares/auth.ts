import { Request, NextFunction } from "express";
import { getAccessToken, getPayloadFromToken } from "../services/token.service";

export interface IRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}

export function authenticateUser(req: IRequest, res: any, next: NextFunction) {
    const accessToken: String = getAccessToken(req);
    if (accessToken === "") return res.status(401).end();
    next();
}
