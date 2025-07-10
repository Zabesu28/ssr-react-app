const { build } = require("esbuild");

const args = process.argv.slice(2);
const target = args[0];

(async () => {
  if (target === "client") {
    await build({
      entryPoints: ["src/main.jsx"],
      outfile: "build/client/main.js",
      bundle: true,
      platform: "browser",
      jsx: "automatic",
      loader: { ".js": "jsx" },
      sourcemap: true,
    });
    console.log("✅ Build client terminé");
  } else if (target === "server") {
    await build({
      entryPoints: ["server/server.jsx"],
      outfile: "build/server.js",
      bundle: true,
      platform: "node",
      format: "cjs",
      target: ["node20"],
    });
    console.log("✅ Build serveur terminé");
  } else {
    console.log("❌ Merci de spécifier 'client' ou 'server'");
  }
})();