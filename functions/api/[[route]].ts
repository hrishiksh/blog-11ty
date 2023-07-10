import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

export const onRequest = handle(app);
