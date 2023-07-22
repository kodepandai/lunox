import fs from "fs";
const packages = fs.readdirSync("./packages");
const newVersion = process.argv[2];
packages.forEach((p) => {
  const json = JSON.parse(fs.readFileSync(`./packages/${p}/package.json`));
  json.version = newVersion;
  fs.writeFileSync(
    `./packages/${p}/package.json`,
    JSON.stringify(json, null, 2),
  );
});
