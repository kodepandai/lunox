let View = null;
import(`../../../app/resources/view/${window._view}.svelte`).then(
  ({ default: component }) => {
    View = new component({
      target: document.getElementById("app"),
      hydrate: true,
      props: window._data,
    });
  }
);
export default View;
