const esbuild = require("esbuild");

const target = process.argv[2];

if (target === "client") {
  esbuild.build({
    entryPoints: ["src/main.jsx"],
    outfile: "dist/bundle.js",
    bundle: true,
    platform: "browser",
    jsx: "automatic",
    loader: { ".js": "jsx" },
    sourcemap: true,
  }).then(() => {
    console.log("✅ Build client terminé");
  }).catch(() => process.exit(1));
} else if (target === "server") {
  esbuild.build({
    entryPoints: ["server/server.jsx"],
    outfile: "build/server.js",
    bundle: true,
    platform: "node",
    format: "cjs",
    target: ["node20"],
  }).then(() => {
    console.log("✅ Build serveur terminé");
  }).catch(() => process.exit(1));
} else {
  console.error("❌ Merci de spécifier 'client' ou 'server'");
  process.exit(1);
}