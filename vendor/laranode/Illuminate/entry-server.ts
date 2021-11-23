export const render = async (url: any, props: any) => {
  let View;
  if (process.env.NODE_ENV == "production") {
    View = (await import(base_path("/server/app/resources/view/" + props.view)))
      .default;
  } else {
    View = (
      await import(base_path(`../app/resources/view/${props.view}.svelte`))
    ).default;
  }
  return View.render(props);
};
