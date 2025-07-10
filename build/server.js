// server/server.jsx
import express from "express";
import { renderToStaticMarkup } from "react-dom/server";

// src/App.jsx
import React from "react";
function App({ todos }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Liste des t\xE2ches"), /* @__PURE__ */ React.createElement("ul", null, todos.map((todo) => /* @__PURE__ */ React.createElement("li", { key: todo.id }, todo.title, " ", todo.completed ? "\u2705" : "\u274C"))));
}

// server/server.jsx
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import React2 from "react";
var app = express();
var PORT = 3e3;
console.log("\u{1F680} Serveur Express d\xE9marr\xE9");
app.get("/", async (req, res) => {
  console.log("Route / appel\xE9e");
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const todos = await response.json();
    console.log("\u2705 Todos c\xF4t\xE9 serveur :", todos.length);
    const appHtml = renderToStaticMarkup(/* @__PURE__ */ React2.createElement(App, { todos }));
    const htmlTemplate = fs.readFileSync(path.resolve("build/client/index.html"), "utf-8");
    const initialDataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(todos).replace(/</g, "\\u003c")}</script>`;
    const finalHtml = htmlTemplate.replace("<!--SSR-->", `${appHtml}${initialDataScript}`);
    res.send(finalHtml);
  } catch (err) {
    console.error("\u274C Erreur c\xF4t\xE9 serveur :", err);
    res.status(500).send("Erreur interne du serveur");
  }
});
app.use(express.static(path.resolve("build/client")));
app.listen(PORT, () => {
  console.log(`\u2705 SSR server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
