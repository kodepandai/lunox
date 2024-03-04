import { Route } from "@lunoxjs/core/facades";
import SessionController from "../app/Http/Controllers/SessionController";

await Route.middleware("web").group(async () => {
  Route.get("/halo", () => "halo");
  await Route.prefix("/eloquent").group(async () => {
    Route.post("/attempt", [SessionController, "attemptEloquent"]);
  });

  await Route.prefix("/typeorm").group(async () => {
    Route.post("/attempt", [SessionController, "attemptTypeorm"]);
  });
  await Route.prefix("/drizzle").group(async () => {
    Route.post("/attempt", [SessionController, "attemptDrizzle"]);
  });
});
