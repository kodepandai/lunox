import { DB } from "@lunoxjs/drizzle";
import { Route, Response } from "@lunoxjs/core/facades";

Route.get("/", () => {
  return Response.make({
    success: true,
    message: "OK",
  });
});

Route.get("/users", async () => {
  const users = await DB.query.users.findMany();
  return Response.make({
    success: true,
    message: "User List",
    data: { users },
  });
});
