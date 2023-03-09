import { Route, Response } from "../../src";

Route.get("/", () => {
  return Response.make({
    success: true,
    message: "OK",
  });
});
