export type TransformViewClient = (
  resolver: (name: string) => Promise<unknown>,
) => Promise<any>;

export const makeViewTransform =
  (transformView: TransformViewClient) =>
    async (modules: Record<string, any>, viewPath = window._ctx.paths[0]) => {
      return transformView(async (name) => {
        let component: any;
        let layout: any;
        await Promise.all(
          Object.keys(modules).map(async (m) => {
            const ext = m.split(".").pop();
            if (m == `${viewPath}/${name.replace(".", "/")}.${ext}`) {
              if (typeof modules[m] == "function") {
                component = await modules[m]();
              } else {
                component = modules[m];
              }
              if (component.layout) {
                if (typeof component.layout != "string")
                  throw new Error("extending layout must be a string");
                const fullViewLayoutPath = `${viewPath}/${component.layout.replaceAll(
                  ".",
                  "/",
                )}.${ext}`;
                if (typeof modules[fullViewLayoutPath] == "function") {
                  layout = (await modules[fullViewLayoutPath]()).default;
                } else {
                  layout = modules[fullViewLayoutPath].default;
                }
              }
            }
          }),
        );
        return { ...component, layout };
      });
    };
