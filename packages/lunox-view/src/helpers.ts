import View from "./Facade/View";

global.view = (path: string, data: Record<string, any> = {}) =>
 View.make(path, data) as any;
