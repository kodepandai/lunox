import path from "path";
import type Repository from "../Config/Repository";
import Container from "../Container/Container";
import type { Bootstrapper } from "../Contracts/Foundation/Boostrapper";
import Env from "../Support/Env";
import type ServiceProvider from "../Support/ServiceProvider";
import type { Class } from "../Types";

class Application extends Container {

    protected _basePath!: string;

    protected isBooted = false

    constructor(basePath: string | null = null) {
        super()
        global.app = ()=>this
        this.setBasePath(basePath)
    }

    setBasePath(basePath: string | null) {
        this._basePath = basePath?.replace(new RegExp(`${path.sep}$`), '') || process.cwd()
        this.bindPaths()
        return this._basePath
    }

    basePath(_path = '') {
        return path.join(this._basePath, _path)
    }
    configPath(_path = '') {
        return path.join(this._basePath, 'config', _path)
    }

    bindPaths() {
        this.instance('path.basePath', this.basePath())
        this.instance('path.configPath', this.configPath())
    }

    async bootstrapWith(bootstrappers: Class<Bootstrapper>[]) {
        for (let index = 0; index < bootstrappers.length; index++) {
            await (new bootstrappers[index]()).bootstrap(this)
            
        }
    }

    async register(provider: ServiceProvider) {
       await provider.register()
    }

    async registerConfiguredProviders(){
        let providers = this.make<Repository>('config').get<Class<ServiceProvider>[]>('app.providers')||[]
        for (let index = 0; index < providers.length; index++) {
            await this.register(new providers[index](this))
        }
    }

    async boot(){
        if(this.isBooted){
            return
        }
        let providers = this.make<Repository>('config').get<Class<ServiceProvider>[]>('app.providers')||[]
        for (let index = 0; index < providers.length; index++) {
            await (new providers[index](this)).boot()
        }

    }

}

export default Application