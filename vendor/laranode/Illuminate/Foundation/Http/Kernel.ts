import path from "path";
import polka, { Polka } from "polka"
import type { Bootstrapper } from "../../Contracts/Foundation/Boostrapper";
import Route from "../../Support/Facades/Route";
import type { Class } from "../../Types";
import type Application from "../Application";
import BootProviders from "../Bootstrap/BootProviders";
import LoadConfiguration from "../Bootstrap/LoadConfiguration";
import LoadEnvirontmentVariabel from "../Bootstrap/LoadEnvirontmentVariabel";
import RegisterFacades from "../Bootstrap/RegisterFacades";
import RegisterProviders from "../Bootstrap/RegisterProviders";

class Kernel {

    protected app:Application
    protected server:Polka;

    protected bootstrappers: Class<Bootstrapper>[]= [
        LoadEnvirontmentVariabel,
        LoadConfiguration,
        RegisterFacades,
        RegisterProviders,
        BootProviders
    ]

    constructor(app:Application){
        this.app = app
        this.server = polka()
    }

    async start(){
        await this.app.bootstrapWith(this.bootstrappers)
        const port = env('PORT')||8000;
        let routes = Route.getRoutes()
        await Promise.all(routes.map((route)=>{
            this.server[route.method](path.join(route.prefix, route.uri), (req, res)=>{
                const response = route.action()
                if(['object', 'string','number'].includes(typeof response)){
                    res.end(JSON.stringify(response))    
                }
            })
        }))
        this.server.listen(port, ()=>{
            console.log('server run on port: '+port)
        })
    }
}

export default Kernel