import path from "path"
import { fileURLToPath } from "url"

global.getCurrentDir = (importMetaUrl:string)=>{
    return path.dirname(fileURLToPath(importMetaUrl))
}