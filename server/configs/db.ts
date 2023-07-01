import { config } from "dotenv";
import mongoose from "mongoose";
config();

mongoose.set("strictQuery", true);

(async () => {
    try {
        const CONN = await mongoose.connect(process.env.CONNECTION_STRING!);
        console.log("Connection Successful");
    } catch (e) {
        console.log("Erorr in connection.", e);
    }
})();
