import jwt from "jsonwebtoken";
import { MyRequest } from "../middlewares/auth";

export const generateTokens = (payload: any) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY!, {
        algorithm: "HS256",
        // until I find a way to handle the error when jwt expires
        expiresIn: "1y",
    });

    const refreshToken: string = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY!, {
        expiresIn: "1y",
    });

    return { accessToken, refreshToken };
};

export const getPayloadFromToken = (access_token: String) => {
    const decodedJWT: any = jwt.decode(access_token) || {};
    // const decodedJWT: string | jwt.JwtPayload = jwt.decode(access_token) || {};
    return decodedJWT;
};

export const getAccessToken = (req: MyRequest): String => {
    const extractedAccessToken: string = getAccessTokenFromRequest(req);
    const extractedRefreshToken: string = getRefreshTokenFromRequest(req);

    let decodedToken;
    try {
        decodedToken = jwt.verify(extractedAccessToken, process.env.ACCESS_TOKEN_KEY!);
    } catch (err: any) {
        console.log("verification failed");
        // decodedToken = null;
    }

    if (decodedToken) return extractedAccessToken;

    let refreshDecoded: any;
    try {
        refreshDecoded = jwt.verify(extractedRefreshToken, process.env.REFRESH_TOKEN_KEY!);
    } catch (err) {
        refreshDecoded = null;
    }

    if (!refreshDecoded) return "";

    const { accessToken } = generateTokens(refreshDecoded.email);

    return accessToken;
};

export const getAccessTokenFromRequest = (req: MyRequest) => {
    const tokens_string: string = req?.cookies?.tokens;
    const tokens = tokens_string && JSON.parse(tokens_string);
    const access_token: string = tokens?.accessToken || "";

    return access_token;
};

export const getRefreshTokenFromRequest = (req: MyRequest) => {
    const tokens_string: string = req?.cookies?.tokens || "";
    const tokens = tokens_string && JSON.parse(tokens_string);
    const refresh_token: string = tokens?.refreshToken || "";

    return refresh_token;
};
