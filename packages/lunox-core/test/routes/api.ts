import { Request } from "../../src";
import { Response, Route } from "../../src/Support/Facades";
import fs from "fs";
import Counter from "../app/Counter";

Route.get("/", () => {
  return Response.make({
    success: true,
    message: "OK",
  });
});

Route.get("/request-1", async () => {
  const count = {
    bind: {
      init:0,
      last:0
    },
    singleton: {
      init:0,
      last:0
    },
    scoped: {
      init:0,
      last:0
    }
  }
   count.bind.init = app<Counter>("counter").getCount();
   count.singleton.init = app<Counter>("singletonCounter").getCount();
   count.scoped.init = app<Counter>("scopedCounter").getCount();
  await wait(500);
  app<Counter>("counter").decrement(10);
  app<Counter>("singletonCounter").decrement(10);
  app<Counter>("scopedCounter").decrement(10);
  count.bind.last = app<Counter>("counter").getCount();
  count.singleton.last = app<Counter>("singletonCounter").getCount();
  count.scoped.last = app<Counter>("scopedCounter").getCount();
  return Response.make({ ...request().all(), count });
});

Route.get("/request-2", async () => {
  const count = {
    bind: {
      init:0,
      last:0
    },
    singleton: {
      init:0,
      last:0
    },
    scoped: {
      init:0,
      last:0
    }
  }
   count.bind.init = app<Counter>("counter").getCount();
   count.singleton.init = app<Counter>("singletonCounter").getCount();
   count.scoped.init = app<Counter>("scopedCounter").getCount();
  app<Counter>("counter").increment(5);
  app<Counter>("singletonCounter").increment(5);
  app<Counter>("scopedCounter").increment(5);
  count.bind.last = app<Counter>("counter").getCount();
  count.singleton.last = app<Counter>("singletonCounter").getCount();
  count.scoped.last = app<Counter>("scopedCounter").getCount();
  request().merge({ foo: "bar" });
  return Response.make({ ...request().all(), count });
});
Route.post("/", () => "halo");
Route.post("/upload", handleUpload);
Route.put("/upload", handleUpload);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
function handleUpload(req: Request) {
  let file,
    files: string = "";

  if (req.file("file")) {
    file = fs.readFileSync(req.file("file").path(), "utf-8");
    files = fs.readFileSync(req.files("file")[0]?.path(), "utf-8");
  }
  return Response.make({
    file,
    files,
    count: req.files("file").length,
    foo: req.input("foo"),
    bus: req.get("bus"),
  });
}
