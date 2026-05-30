// Combined post-deploy ping: runs the full IndexNow push and then the
// focused priority-city push. Cross-platform-safe (no shell chaining).
// Each child is spawned with stdio inherited, so logs flow straight through.

const { spawn } = require("node:child_process");
const path = require("node:path");

function run(script) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(__dirname, script)], {
      stdio: "inherit",
    });
    child.on("exit", (code) => {
      if (code !== 0) console.warn(`[${script}] exited with code ${code}`);
      resolve(); // never reject — post-deploy must never fail the build
    });
    child.on("error", (err) => {
      console.warn(`[${script}] failed to start: ${err.message}`);
      resolve();
    });
  });
}

(async () => {
  await run("ping-search-engines.js");
  await run("ping-priority-cities.js");
})();
