import "../../src/helpers";

describe("Helper get_class_method Testing", () => {
  test("can get class methods from instance", async () => {
    class A {
      public methodA() {}
    }

    const a = new A();
    expect(get_class_methods(a)).toContain("methodA");
  });

  test("can get class methods from child and parent instance", async () => {
    class A {
      public methodA() {}
    }

    class B extends A {
      public methodB() {}
    }

    const b = new B();
    expect(get_class_methods(b)).toMatchObject(["methodB", "methodA"]);
  });

  test("can get class methods from child and 2nd parent instance", async () => {
    class A {
      public methodA() {}
    }

    class B extends A {
      public methodB() {}
    }

    class C extends B {
      public methodC() {}
    }

    const c = new C();
    expect(get_class_methods(c)).toMatchObject([
      "methodC",
      "methodB",
      "methodA",
    ]);
  });
});
