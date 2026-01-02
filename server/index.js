import express from "express";
import cors from "cors";
import generateRoutes from "./routes/generate.js";
import runTestsRoutes from "./routes/runTests.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/generate-tests", generateRoutes);
app.use("/run-tests", runTestsRoutes);

// health check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// IMPORTANT: bind to 127.0.0.1
app.listen(5000, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:5000");
});
