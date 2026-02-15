import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();

// ================= Middleware =================

app.use(express.json());

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(clerkMiddleware());

// ================= API Routes =================

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// ================= Health =================

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API running 🚀" });
});

// ================= Frontend Serve (Render Compatible) =================

if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(process.cwd(), "backend", "public");

  app.use(express.static(frontendPath));

  // Express v5 catch-all
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ================= Start =================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  } catch (err) {
    console.error("Server failed:", err);
  }
};

startServer();