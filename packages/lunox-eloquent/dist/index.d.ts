import * as _lunoxjs_core from '@lunoxjs/core';
import { ServiceProvider, Application, Class } from '@lunoxjs/core';
import * as objection from 'objection';
import { Model as Model$1, MaybeCompositeId, StaticHookArguments, Pojo } from 'objection';
import { Knex } from 'knex';
export { Knex } from 'knex';

declare class DatabaseServiceProvider extends ServiceProvider {
    register(): Promise<void>;
    boot(): Promise<void>;
}

declare class Model extends Model$1 {
    #private;
    id: MaybeCompositeId;
    created_at?: Date;
    updated_at?: Date;
    [key: string]: any;
    protected static fillable: string[];
    protected static guarded: string[];
    /**
     * Append custom attributes to external data
     */
    protected static appends: string[];
    /**
     * Hide attributes from external data.
     */
    protected static hidden: string[];
    protected static timestamps: boolean;
    protected static table: string;
    protected static primaryKey: string;
    protected attributes: Record<string, any>;
    constructor();
    static get tableName(): string;
    static get idColumn(): string;
    static beforeInsert(args: StaticHookArguments<any, any>): void;
    static beforeUpdate(args: StaticHookArguments<any, any>): void;
    /**
     * Parse data from database to Model instance.
     * We can get custom attribute here by running getXxxAttribute methods.
     */
    $parseDatabaseJson(json: Pojo): Pojo;
    /**
     * Format data from internal to external
     * this will run on when toJson method is called.
     */
    $formatJson(json: Pojo): Pojo;
    /**
     * Format json from internal to database.
     */
    $formatDatabaseJson(json: Pojo): Pojo;
    protected static touchTimeStamps(inputItems: any[], key: string): void;
    /**
     * filter input from fillable and guarded value.
     */
    protected static filterInput(inputItems: any[]): void;
    save(): Promise<objection.NumberQueryBuilder<objection.SingleQueryBuilder<objection.QueryBuilderType<this>>> | objection.SingleQueryBuilder<objection.SingleQueryBuilder<objection.QueryBuilderType<this>>>>;
    getOriginal(): Record<string, any>;
    setOriginal(original: any): void;
}

interface Configuration {
    driver: string;
    url?: string;
    host: string;
    port: string;
    database: string;
    username: string;
    password: string;
    useNullAsDefault?: boolean;
    pool?: {
        min?: number;
        max?: number;
        idleTimeoutMillis?: number;
    };
}

declare class DatabaseManager {
    protected app: Application;
    protected config: Record<string, any>;
    protected driver: any;
    protected db: Knex;
    constructor(app: Application);
    /**
     * Get connection configuration
     */
    protected configuration(name?: string | null): Configuration;
    /**
     * Get default connection name
     */
    getDefaultConnection(): string;
    /**
     * Boot registered driver to application
     */
    bootDriver(): Promise<void>;
    /**
     * make connection to database
     */
    makeConnection(): Promise<void>;
    /**
     * check is connection using knexjs
     */
    isUsingKnex(): boolean;
    get table(): Knex.Table<any, any[]>;
    get raw(): Knex.RawBuilder<any, any>;
    get transaction(): {
        (config?: Knex.TransactionConfig | undefined): Promise<Knex.Transaction<any, any[]>>;
        (transactionScope?: null | undefined, config?: Knex.TransactionConfig | undefined): Promise<Knex.Transaction<any, any[]>>;
        <T>(transactionScope: (trx: Knex.Transaction<any, any[]>) => void | Promise<T>, config?: Knex.TransactionConfig | undefined): Promise<T>;
    };
    getDb(): Knex;
    getDriver(): any;
}

declare const _default: DatabaseManager & typeof _lunoxjs_core.ExtendedFacade;

declare abstract class Seeder {
    run(): Promise<void>;
    call<T extends Seeder>(seeder: Class<T>): Promise<void>;
}

export { _default as DB, DatabaseServiceProvider, Model, Seeder };
