import path from "path";
import Kernel from "../app/Http/Kernel";
import Application from "../vendor/laranode/Illuminate/Foundation/Application";

const basePath = path.join(get_current_dir(import.meta.url), '..')
const app = new Application(basePath)

app.singleton('Kernel', Kernel)

export default app