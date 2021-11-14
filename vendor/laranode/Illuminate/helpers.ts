import path from "path"
import { fileURLToPath } from "url"

global.get_current_dir = (importMetaUrl:string)=>{
    return path.dirname(fileURLToPath(importMetaUrl))
}

global.base_path = (_path: string)=>app().basePath(_path)