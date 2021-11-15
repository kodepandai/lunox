import Route from "../vendor/laranode/Illuminate/Support/Facades/Route";

Route.get("/", () => {
  return "Hello from API";
});

Route.prefix("/group").group(() => {
  Route.get("/x", () => {
    return "OK";
  });

  Route.prefix("/subgroup").group(() => {
    Route.get("/x", () => {
      return "OK";
    });
  });

  Route.get("/x", () => {
    return {
      id: 1,
    };
  });
});

Route.get("/x", () => {
  return {
    id: 1,
  };
});
