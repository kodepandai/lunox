import { Router, ServiceProvider } from "../../../src";

class CallbackServiceProvider extends ServiceProvider {
  static test:Record<string,any>= {};
  async register(): Promise<void> {
    this.app.beforeResolving(Router.symbol, (...beforeResolvingParams)=>{
      CallbackServiceProvider.test.beforeResolvingParams = beforeResolvingParams
    })
    this.app.afterResolving(Router.symbol, (...afterResolvingParams)=>{
      CallbackServiceProvider.test.afterResolvingParams = afterResolvingParams
    });

    this.app.resolving(Router.symbol, (...resolvingParams)=>{
      CallbackServiceProvider.test.resolvingParams = resolvingParams
    });
  }
}
export default CallbackServiceProvider;
