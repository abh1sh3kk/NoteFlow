import { config } from "dotenv";
import mongoose from "mongoose";
config();

(async () => {
    try {
        const CONN = await mongoose.connect("mongodb://127.0.0.1:27017");
        console.log("Connection Successful");
    } catch (e) {
        console.log("Erorr in connection.", e);
    }
})();
