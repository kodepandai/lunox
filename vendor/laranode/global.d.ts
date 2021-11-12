import type Application from "./Illuminate/Foundation/Application";

declare global {
    var app: Application
    var getCurrentDir: (importMetaUrl:string)=>string
}