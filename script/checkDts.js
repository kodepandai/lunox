import fs from "fs/promises";
import path from "path";

await checkDtsExists("packages", ["lunox-build", "lunox-create"]);

async function checkDtsExists(folder, exclude=[]) {
  const packages = (await fs.readdir(path.join(process.cwd(), folder))).filter(x=>exclude.indexOf(x)==-1);
  const isExists = packages.every(async (p) => {
    const indexDtsPath = path.join(process.cwd(), folder, p, "dist/index.d.ts");
    const stat = await fs.stat(indexDtsPath, "utf8");
    return stat.isFile();
  });
  if (!isExists) throw new Error("some dts not generated");
  // color green
  console.log("\x1b[32m%s\x1b[0m", "all dts generated");
}
