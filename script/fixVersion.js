import fs from "fs/promises";
import path from "path";

await Promise.all(["packages", "presets"].map(removeWorkspacePrefix));

async function removeWorkspacePrefix(folder) {
  const presets = await fs.readdir(path.join(process.cwd(),folder));
  presets.map(async (p) => {
    const jsonPath  = path.join(process.cwd(),folder,p,"package.json")
    let content = await fs.readFile(jsonPath,'utf8');
    content = content.replace(/workspace\:/g, "");
    return fs.writeFile(jsonPath, content);
  });
}
