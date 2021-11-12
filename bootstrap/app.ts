import Kernel from "../app/Http/Kernel";
import Application from "../vendor/laranode/Illuminate/Foundation/Application";

const app = new Application(getCurrentDir(import.meta.url))

app.singleton('Kernel', Kernel)

export default app