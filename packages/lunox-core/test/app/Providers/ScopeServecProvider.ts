import { ServiceProvider } from "../../../src";
import Counter from "../Counter";

class ScopeServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    this.app.scoped("scopedCounter", Counter)
    this.app.bind("counter", Counter)
    this.app.singleton("singletonCounter", Counter)
  }
}
export default ScopeServiceProvider;
