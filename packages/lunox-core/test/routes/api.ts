import { Response, Route } from "../../src/Support/Facades";

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

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
