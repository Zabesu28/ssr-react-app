import { build } from "esbuild";
import path from "path";

build({
  entryPoints: ["server/server.jsx"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "build/server.js",
  sourcemap: true,
  external: ["express", "react", "react-dom", "node-fetch"],
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
  },
}).catch(() => process.exit(1));