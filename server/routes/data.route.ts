import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import userData from "../models/user.model";
import bcrypt from "bcrypt";
import { MyRequest } from "../middlewares/auth";
import { config } from "dotenv";
import { getUserEmail } from "..";
import cookieParser from "cookie-parser";
config();
const router = express.Router();
router.use(cookieParser());
 
