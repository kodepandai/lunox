import type Application from "./Illuminate/Foundation/Application";

declare module NodeJs {
    interface Global {
        app: ()=>Application
    }
}