import Kernel from "../app/Http/Kernel";
import Application from "../vendor/laranode/Illuminate/Foundation/Application";

const app = new Application(__dirname)

app.singleton('Kernel', Kernel)