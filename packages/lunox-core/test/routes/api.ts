import { Response, Route } from "../../src/Support/Facades";

Route.get("/", () => {
  return Response.make({
    success: true,
    message: "OK",
  });
});
