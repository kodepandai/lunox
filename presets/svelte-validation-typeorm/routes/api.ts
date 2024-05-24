import { DB } from "@lunoxjs/typeorm";
import User from "app/Model/User";
import { Route, Response } from "@lunoxjs/core/facades";
import { Mail } from "@lunoxjs/mail";
import { MissingDeleteDateColumnError } from "typeorm";
import DummyMail from "app/Mail/DummyMail";

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
// Route.get("/mail", async () => {
//   Mail.send(new DummyMail("test"));
// });
