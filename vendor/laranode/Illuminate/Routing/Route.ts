import type { CallBack, Method, Routes } from "../Types"
class Route {

    protected routes: Routes[]
    protected currentPrefix: string

    constructor(){
        this.routes = []
        this.currentPrefix = ''
    }

    private addRoutes = (method: Method)=>(uri:string, action: CallBack)=>{
        this.routes.push({
            uri,
            method,
            action,
            prefix: this.currentPrefix
        })
    }

    public get = this.addRoutes('get')
    public post = this.addRoutes('post')
    public delete = this.addRoutes('delete')
    public patch = this.addRoutes('patch')
    public put = this.addRoutes('put')
    public all = this.addRoutes('all')

    public getRoutes(){
        return this.routes
    }

    public prefix(prefix:string){
        this.currentPrefix = prefix
        return this
    }
    
    public async group(callback:string|CallBack){
        if(typeof callback == 'string'){
            await import(callback)
        }
    }
}

export default Route