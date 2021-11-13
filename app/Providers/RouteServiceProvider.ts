import type Application from "../../vendor/laranode/Illuminate/Foundation/Application";
import ServiceProvider from "../../vendor/laranode/Illuminate/Support/ServiceProvider";

class RouteServiceProvider extends ServiceProvider {
    constructor(app: Application){
        super(app)
    }
    
    async register(){
        console.log('Route Service Provider registered')
    }
    async boot(){
        console.log('Route Service Provider Booted')
    }
}

export default RouteServiceProvider