import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 1000,
    max: 5,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
