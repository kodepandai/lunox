import fs from "fs/promises";
import path from "path";
const isWorkspace = process.argv[2] === "--workspace";

if (isWorkspace) {
  await removeWorkspacePrefix("packages", true);
} else {
  await Promise.all(["packages", "presets"].map(removeWorkspacePrefix));
}

async function removeWorkspacePrefix(folder, workspace) {
  const presets = await fs.readdir(path.join(process.cwd(), folder));
  presets.map(async (p) => {
    const jsonPath = path.join(process.cwd(), folder, p, "package.json");
    let content = await fs.readFile(jsonPath, "utf8");
    if (folder == "packages" && workspace) {
      const packageJson = JSON.parse(content);
      for (let dep in packageJson.devDependencies) {
        if (dep.startsWith("@lunoxjs/")) {
          packageJson.devDependencies[dep] = "workspace:*";
        }
      }
      for (let dep in packageJson.dependencies) {
        if (dep.startsWith("@lunoxjs/")) {
          packageJson.dependencies[dep] = "workspace:*";
        }
      }
      for (let dep in packageJson.peerDependencies) {
        if (dep.startsWith("@lunoxjs/")) {
          packageJson.peerDependencies[dep] = "workspace:*";
        }
      }
      content = JSON.stringify(packageJson, null, 2);
    } else {
      content = content.replace(/workspace\:/g, "");
    }
    return fs.writeFile(jsonPath, content);
  });
}
