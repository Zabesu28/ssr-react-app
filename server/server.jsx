import express from "express";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App.jsx";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import React from "react";

const app = express();
const PORT = 3000;

// sert le HTML et les assets

console.log("🚀 Serveur Express démarré");

app.get("/", async (req, res) => {
  console.log("Route / appelée");
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const todos = await response.json();

    console.log("✅ Todos côté serveur :", todos.length);

    const appHtml = renderToStaticMarkup(<App todos={todos} />);
    const htmlTemplate = fs.readFileSync(path.resolve("build/client/index.html"), "utf-8");

    const initialDataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(todos).replace(/</g, '\\u003c')}</script>`;
    const finalHtml = htmlTemplate.replace('<!--SSR-->', `${appHtml}${initialDataScript}`);

    res.send(finalHtml);
  } catch (err) {
    console.error("❌ Erreur côté serveur :", err);
    res.status(500).send("Erreur interne du serveur");
  }
});

app.use(express.static(path.resolve('build/client')));

app.listen(PORT, () => {
  console.log(`✅ SSR server running at http://localhost:${PORT}`);
});