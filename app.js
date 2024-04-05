const express = require("express");
const indexRoute = require("./routes/index");

const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  console.error("Error loading .env file:", result.error);
  logger.error(`Error loading .env file: ${result.error}`);
} else {
  console.log("Loaded .env file successfully");
}

const app = express();
const PORT = process.env.PORT || "3000";

// Middleware
app.use(express.json());

// Routes
app.use(indexRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
