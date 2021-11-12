import type { Concrete, ObjectOf } from "../Types";

interface Binding {
        concrete: Concrete
        shared: boolean
}

class Container {

    /** The container's shared instances. */
    protected instances: ObjectOf<Concrete> = {};

    /** The container's bindings. */
    protected bindings: ObjectOf<Binding> = {}

    /** Register a binding with the container. */
    public bind(abstract: string, concrete: Concrete , shared=false){
        this.bindings[abstract] = {concrete, shared}
    }

    /** Register shared binding in container. */
    public singleton(abstract: string, concrete: Concrete){
        this.bind(abstract, concrete, true)
    }

     /** Instantiate a concrete instance of the given type. */
    build(abstract:string, params: ObjectOf<any> ={}){

        const concrete = this.bindings[abstract].concrete

        let instance:any = null;

        // if concrete is Class, construct it and inject the params
        if(typeof concrete === "function" && /^class\s/.test(concrete+"")){
            instance = Reflect.construct(concrete, [])
            Object.keys(params).forEach(key=>{
                Reflect.set(instance, key, params[key])
            })
        // else, just invoke it as function 
        } else {
            instance = (concrete as Function)()
        }
        if(this.bindings[abstract].shared){
            this.instances[abstract] = instance
        }
        return instance
    }

    /** Resolve the given type from the container. */
    make(abstract: string, params = {}){  

        if(this.instances[abstract] && Object.keys(params).length==0){
            return this.instances[abstract]
        }
        return this.build(abstract, params)
        
    }

    /** Register an existing instance as shared in the container. */
    instance(abstract:string, instance:any):any{
        this.instances[abstract] = instance
        return instance
    }
}

export default Container