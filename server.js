import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(path.join(root, "public")));
app.post("/api", (req, res) => {
  let hex = String(req.body.text || "").trim().replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return res.status(400).json({ error: "need 3 or 6 hex digits" });
  const n = parseInt(hex, 16);
  res.json({ hex: "#" + hex.toLowerCase(), r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 });
});
app.listen(process.env.PORT || 8128);
