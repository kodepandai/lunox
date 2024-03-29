export type TransformViewClient = (
  resolver: (name: string) => Promise<unknown>,
) => Promise<any>;

export const makeViewTransform =
  (transformView: TransformViewClient) =>
    async (modules: Record<string, any>, viewPath = window._ctx.paths[0]) => {
      return transformView(async (name) => {
        let component: any;
        await Promise.all(
          Object.keys(modules).map(async (m) => {
            if (
              m == `${viewPath}/${name.replace(".", "/")}.${m.split(".").pop()}`
            ) {
              component = (await modules[m]());
            }
          }),
        );
        return component;
      });
    };
