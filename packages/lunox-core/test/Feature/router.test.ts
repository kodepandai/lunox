import TestCase from "../TestCase";

TestCase.make();

describe("Router Testing", () => {
  test("can access web routes", async () => {
    const res = await agent.get("/home");
    expect(res.text).toMatch("welcome to home");
  });

  test("can access api routes", async () => {
    const res = await agent.get("/api");
    expect(res.body).toMatchObject({
      success: true,
      message: "OK",
    });
  });
});
