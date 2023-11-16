import { Response, Route } from "../../src/Support/Facades";
import fs from "fs";

Route.get("/", () => {
  return Response.make({
    success: true,
    message: "OK",
  });
});

Route.get("/request-1", async () => {
  await wait(500);
  return Response.make(request().all());
});

Route.get("/request-2", async () => {
  request().merge({ foo: "bar" });
  return Response.make(request().all());
});
Route.post("/", () => "halo");
Route.post("/upload", (req) => {
  const file = fs.readFileSync(req.file("file").path(), "utf-8");
  const files = fs.readFileSync(req.files("file")[0].path(), "utf-8");
  return Response.make({ file, files, count: req.files("file").length });
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
