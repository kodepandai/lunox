import type { Middleware } from "vendor/laranode/Illuminate/Contracts/Http/Middleware";

const AuthMiddleware: Middleware = {
    async handle(req, next){
        console.log(req.params, req.query, req.body)
        return next(req)
    }
}

export default AuthMiddleware