import { Arr } from "../Support";

export interface IOptions {
  only: string | string[];
  except: string | string[];
}
class ControllerMiddlewareOptions {
  protected options: IOptions = {
    only: [],
    except: [],
  };

  public constructor(options: IOptions) {
    this.options = options;
  }

  public only(methods: string | string[]) {
    this.options["only"] = Arr.wrap(methods);
    return this;
  }

  public except(methods: string | string[]) {
    this.options["except"] = Arr.wrap(methods);
    return this;
  }
}

export default ControllerMiddlewareOptions;
