import express from "express";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App.jsx";
import fetch from "node-fetch";
import path from "path";
import React from "react";
import { readFile } from "fs/promises";

const app = express();
const PORT = 3000;

console.log("🚀 Serveur Express démarré");

app.get("/", async (req, res) => {
  console.log("Route / appelée");
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const todos = await response.json();

    console.log("✅ Todos côté serveur :", todos.length);

    const appHtml = renderToStaticMarkup(<App todos={todos} />);
    const htmlTemplate = await readFile("index.html", "utf-8");
    const finalHtml = htmlTemplate.replace("<!--SSR-->", appHtml);

    res.send(finalHtml);
  } catch (err) {
    console.error("❌ Erreur côté serveur :", err);
    res.status(500).send("Erreur interne du serveur");
  }
});

app.use(express.static(path.resolve('build')));

app.listen(PORT, () => {
  console.log(`✅ SSR server running at http://localhost:${PORT}`);
});