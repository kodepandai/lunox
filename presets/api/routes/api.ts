import User from "../app/Model/User";
import { Route, Response } from "@lunoxjs/core/facades";
import WelcomeController from "../app/Http/Controllers/WelcomeController";

Route.get("/", [WelcomeController, "home"]);

Route.prefix("/api").group(() => {
  Route.get("/", () => {
    return Response.make({
      success: true,
      message: "OK",
    });
  });

  Route.get("/users", async () => {
    const user = new User();
    user.password = "halo";
    return user.password;
    // get user data from Model (using objection js)
    const users = await User.query().first();
    return Response.make({
      success: true,
      message: "User List",
      data: { users },
    });
  });
});
