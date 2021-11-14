import Route from "../../vendor/laranode/Illuminate/Support/Facades/Route";
import type Application from "../../vendor/laranode/Illuminate/Foundation/Application";
import ServiceProvider from "../../vendor/laranode/Illuminate/Support/ServiceProvider";

class RouteServiceProvider extends ServiceProvider {
    constructor(app: Application){
        super(app)
    }
    
    async register(){
    }
    async boot(){
        await Route.group(base_path('routes/web'))
        await Route.prefix('/api').group(base_path('routes/api'))
    }
}

export default RouteServiceProvider