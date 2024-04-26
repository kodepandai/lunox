import User from "app/Model/User";
import { Route, Response } from "@lunoxjs/core/facades";
import WelcomeController from "app/Http/Controllers/WelcomeController";
import { DB } from "@lunoxjs/typeorm";

Route.get("/", [WelcomeController, "home"]);

Route.prefix("/api").group(() => {
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
});
