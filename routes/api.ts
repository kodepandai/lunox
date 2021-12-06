import { Route, Response } from "lunox";

Route.get("/", () => {
  return Response.make({
    success: true,
    message: "OK",
  });
});
