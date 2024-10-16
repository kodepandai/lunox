import User from "../app/Model/User";
import { Route, Response } from "@lunoxjs/core/facades";

Route.get("/", () => {
  return Response.make({
    success: true,
    message: "OK",
  });
});

Route.get("/users", async () => {
  const users = await User.query();
  return Response.make({
    success: true,
    message: "User List",
    data: { users },
  });
});
