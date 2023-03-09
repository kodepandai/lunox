import User from "app/Model/User";
import { Route, Response } from "lunox";

Route.get("/", () => {
  return Response.make({
    success: true,
    message: "OK",
  });
});

Route.get("/users", async () => {
  // get user data from Model (using objection js)
  const users = await User.query();
  return Response.make({
    success: true,
    message: "User List",
    data: { users },
  });
});
