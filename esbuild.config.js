const { build } = require("esbuild");
const path = require("path");

(async () => {
  const clientBuild = await build({
    entryPoints: ["src/main.jsx"],
    outfile: "build/client/main.js",
    bundle: true,
    platform: "browser",
    jsx: "automatic",
    loader: { ".js": "jsx" },
    sourcemap: true,
  });

  const serverBuild = await build({
    entryPoints: ["server/server.jsx"],
    outfile: "build/server.js",
    bundle: true,
    platform: "node",
    format: "cjs",
    target: ["node20"],
  });

  console.log("✅ Build terminé");
})();