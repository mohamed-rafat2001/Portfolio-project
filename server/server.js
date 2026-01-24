import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./src/db/config.js";
dotenv.config();

dbConnect();
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`app running on port ${port} `);
});

// Trigger restart for env loading
