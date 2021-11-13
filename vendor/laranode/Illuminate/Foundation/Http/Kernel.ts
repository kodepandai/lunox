import polka, { Polka } from "polka"
import type { Bootstrapper } from "../../Contracts/Foundation/Boostrapper";
import type { Class } from "../../Types";
import type Application from "../Application";
import BootProviders from "../Bootstrap/BootProviders";
import LoadConfiguration from "../Bootstrap/LoadConfiguration";
import LoadEnvirontmentVariabel from "../Bootstrap/LoadEnvirontmentVariabel";
import RegisterProviders from "../Bootstrap/RegisterProviders";

class Kernel {

    protected app:Application
    protected server:Polka;

    protected bootstrappers: Class<Bootstrapper>[]= [
        LoadEnvirontmentVariabel,
        LoadConfiguration,
        RegisterProviders,
        BootProviders
    ]

    constructor(app:Application){
        this.app = app
        this.server = polka()
    }

    async start(){
        await this.app.bootstrapWith(this.bootstrappers)
        const port = env('PORT')||8000
        this.server.listen(port, ()=>{
            console.log('server run on port: '+port)
        })
    }
}

export default Kernel