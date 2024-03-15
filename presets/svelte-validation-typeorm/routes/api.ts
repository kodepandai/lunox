import { DB } from "@lunoxjs/typeorm";
import User from "../app/Model/User";
import { Route, Response } from "@lunoxjs/core/facades";

Route.get("/", () => {
  return Response.make({
    success: true,
    message: "OK",
  });
});

Route.get("/users", async () => {
  const users = await DB.use(User).find();
  return Response.make({
    success: true,
    message: "User List",
    data: { users },
  });
});
