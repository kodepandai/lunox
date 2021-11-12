import path from "path";
import Container from "../Container/Container";

class Application extends Container {

    protected _basePath:string;

    constructor(basePath:string|null=null){
        super()
        this._basePath = this.setBasePath(basePath)
    }
    
    setBasePath(basePath:string|null){
        this._basePath = basePath?.replace(new RegExp(`${path.sep}$`), '')||process.cwd()
        return this._basePath
    }

    basePath(_path=''){
        return path.join(this._basePath, _path)
    }

    bindPaths(){
        this.instance('path.basePath', this.basePath())
    }


}

export default Application