import type { ContentConfig } from "./contracts/Mail";

class Content {
  constructor(protected config: ContentConfig) { }
  hasView() {
    return !!this.config.view;
  }
  hasHtml() {
    return !!this.config.html;
  }
  getView() {
    return this.config.view;
  }
  getHtml() {
    return this.config.html;
  }
}
export default Content;
