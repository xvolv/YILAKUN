import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Lightweight dev-only AI proxy to avoid browser CORS/referrer issues
  // and to keep the API key off the client. Production should use a proper
  // backend/edge function with the same shape.
  configureServer(server: any) {
    server.middlewares.use(
      "/api/chat",
      async (req: any, res: any, next: any) => {
        if (req.method !== "POST") return next();

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const raw = Buffer.concat(chunks).toString("utf8");
          const body = raw ? JSON.parse(raw) : {};

          const messages = Array.isArray(body?.messages) ? body.messages : [];
          const apiKey = process.env.VITE_AI_API_KEY || process.env.AI_API_KEY;
          const model = process.env.VITE_AI_MODEL || "gemini-1.5-flash-latest";

          if (!apiKey) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({ error: "Missing VITE_AI_API_KEY on server" })
            );
            return;
          }

          const contents = messages.map((m: any) => ({
            role: m?.role === "assistant" ? "model" : "user",
            parts: [{ text: String(m?.content ?? "") }],
          }));

          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
          const r = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
            },
            body: JSON.stringify({ contents }),
          });

          const rawText = await r.text();
          let parsed: any = undefined;
          try {
            parsed = rawText ? JSON.parse(rawText) : undefined;
          } catch (_) {
            parsed = undefined;
          }

          if (!r.ok) {
            const upstream =
              parsed?.error?.message ||
              rawText ||
              r.statusText ||
              "Upstream error";
            console.error("/api/chat upstream error", r.status, upstream, {
              url,
              model,
            });
            res.statusCode = r.status;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: upstream }));
            return;
          }

          const data: any = parsed ?? {};
          const reply =
            data?.candidates?.[0]?.content?.parts
              ?.map((p: any) => p?.text)
              .filter(Boolean)
              .join("\n") || data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (!reply) {
            console.error("/api/chat missing reply", { data, url, model });
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "No reply from model" }));
            return;
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ reply }));
        } catch (err: any) {
          console.error("/api/chat handler error", err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: err?.message || "Server error" }));
        }
      }
    );
  },
}));
