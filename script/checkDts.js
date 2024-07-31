import fs from "fs/promises";
import path from "path";

await checkDtsExists("packages", ["lunox-build", "lunox-create"]);

async function checkDtsExists(folder, exclude = []) {
  const packages = (await fs.readdir(path.join(process.cwd(), folder))).filter(
    (x) => exclude.indexOf(x) == -1,
  );
  await Promise.all(packages.map(async (p) => {
    const { files } = (
      await import(path.join(process.cwd(), folder, p, "package.json"), {
        assert: { type: "json" },
      })
    ).default;
    const dtsFiles = files.filter((x) => x.includes(".d.ts"));
    for (const dtsFile of dtsFiles) {
      const dtsValue = await fs.readFile(
        path.join(process.cwd(), folder, p, dtsFile),
        "utf8",
      );
      const realDts = dtsValue.match(/export \* from ["']\.\/(.*?)["']/)?.[1];
      if (!realDts) continue;
      let statIndex, statFile;
      try {
        statIndex = await fs.stat(
          path.join(process.cwd(), folder, p, realDts, "index.d.ts"),
          "utf8",
        );
        if (statIndex.isFile()) return true;
      } catch (e) {
        //
      }
      try {
        statFile = await fs.stat(
          path.join(process.cwd(), folder, p, realDts+".d.ts"),
          "utf8",
        );
        if (statFile.isFile()) return true;
      } catch (e) {
        //
      }
        throw new Error(
          `dts file ${realDts} not found in ${folder}/${p}`,)
    }
    const indexDtsPath = path.join(process.cwd(), folder, p, "dist/index.d.ts");
    const stat = await fs.stat(indexDtsPath, "utf8");
    return stat.isFile();
  }));
  // color green
  console.log("\x1b[32m%s\x1b[0m", "all dts generated");
}
