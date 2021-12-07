import { Route, Response, DB } from "lunox";

Route.get("/", () => {
  return Response.make({
    success: true,
    message: "OK",
  });
});

Route.get("/users", async () => {
  const users = await DB.table("users");
  return Response.make({
    success: true,
    message: "User List",
    data: users,
  });
});
