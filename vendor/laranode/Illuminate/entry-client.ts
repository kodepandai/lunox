let View = null;
const modules = import.meta.glob("../../../app/resources/view/**/*.svelte");
Object.keys(modules).forEach((m) => {
  if (m == `../../../app/resources/view/${window._view}.svelte`) {
    modules[m]().then(({ default: component }) => {
      View = new component({
        target: document.getElementById("app"),
        hydrate: true,
        props: window._data,
      });
    });
  }
});
export default View;
