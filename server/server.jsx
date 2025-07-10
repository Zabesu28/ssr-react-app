import express from "express";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App.jsx";
import fetch from "node-fetch";
import fs from "fs/promises";
import path from "path";
import React from "react";

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve("build/client")));

app.get("/", async (req, res) => {
  console.log("Route / appelée");

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des tâches : ${response.status}`);
    }

    const todos = await response.json();
    console.log("✅ Todos côté serveur :", todos.length);

    const appHtml = renderToStaticMarkup(<App todos={todos} />);

    let htmlTemplate;
    try {
      htmlTemplate = await fs.readFile(path.resolve("index.html"), "utf-8");
    } catch (err) {
      console.error("❌ Erreur lors du chargement du fichier HTML :", err.message);
      return res
        .status(500)
        .send("Erreur lors du chargement de la page HTML : " + err.message);
    }

    const finalHtml = htmlTemplate.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );

    res.send(finalHtml);
  } catch (err) {
    console.error("❌ Erreur côté serveur :", err.message);
    res.status(500).send("Erreur serveur : " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`✅ SSR server running at http://localhost:${PORT}`);
});