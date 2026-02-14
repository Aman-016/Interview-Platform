import express from "express";
import cors from "cors";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// Inngest endpoint
app.use("/api/inngest", serve({ client: inngest, functions }));

// API routes
app.get("/health", (req, res) => {
  res.json({ msg: "api is up and running" });
});

app.get("/books", (req, res) => {
  res.json({ msg: "this is the books endpoints" });
});

// ✅ Serve frontend in production (Render compatible)
if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(process.cwd(), "frontend", "dist");

  app.use(express.static(frontendPath));

  // Catch-all for React router
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log(`Server is running on port: ${ENV.PORT}`)
    );
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();