import {
  MaybeCompositeId,
  Model as ObjectionModel,
  Pojo,
  StaticHookArguments,
} from "objection";
import { Str } from "../../Support";
import type { ObjectOf } from "../../Types";
abstract class Model extends ObjectionModel {
  id!: MaybeCompositeId;
  created_at?: Date;
  updated_at?: Date;
  [key: string]: any;

  protected static fillable: string[] = [];

  protected static guarded: string[] = [];

  /**
   * Append custom attributes to external data
   */
  protected static appends: string[] = [];

  /**
   * Hide attributes from external data.
   */
  protected static hidden: string[] = [];

  protected static timestamps = true;

  protected static table = "";

  protected static primaryKey = "id";

  /**
   * this to hold setter and getter methods
   * eg: setXXXAttribute, getXXXAttribute
   */
  #setters: string[] = [];
  #getters: string[] = [];

  protected attributes: ObjectOf<any> = {};

  // indicates that instance is from DB.
  #fromDb = false;

  // to store original attributes from db.
  #original: ObjectOf<any> = {};

  constructor() {
    super();

    // collect getter and setter methods.
    this.#setters =
      get_class_methods(this)
        .join(";")
        .match(/(?<=(set))(.*?)(?=Attribute)/g) || [];
    this.#getters =
      get_class_methods(this)
        .join(";")
        .match(/(?<=(get))(.*?)(?=Attribute)/g) || [];

    // apply getters and setters to attributes
    [...this.#getters, ...this.#setters].forEach((attribute) => {
      const snakeAttribute = Str.snake(attribute);
      Object.defineProperty(this, snakeAttribute, {
        get: () => {
          if (this.#getters.includes(attribute)) {
            return this[`get${attribute}Attribute`]();
          }
          return this.attributes[snakeAttribute];
        },
        set: (val) => {
          // avoid same value is reassigned to same attributes.
          if (
            this.#setters.includes(attribute) &&
            val !== this.attributes[Str.snake(attribute)]
          ) {
            return this[`set${attribute}Attribute`](val);
          }
          this.attributes[snakeAttribute] = val;
        },
        enumerable: (this.constructor as any).appends.includes(snakeAttribute),
        configurable: true,
      });
    });
  }

  static get tableName() {
    return this.table;
  }

  static get idColumn() {
    return this.primaryKey;
  }

  static beforeInsert(args: StaticHookArguments<any, any>) {
    this.filterInput(args.inputItems);

    // if timestamps is true, set created_at of all input to current date.
    // this is must be done after input filtered.
    if (this.timestamps) {
      this.touchTimeStamps(args.inputItems, "created_at");
      this.touchTimeStamps(args.inputItems, "updated_at");
    }
  }

  static beforeUpdate(args: StaticHookArguments<any, any>) {
    this.filterInput(args.inputItems);

    // if timestamps is true, set updated_at of all input to current date.
    // this is must be done after input filtered.
    if (this.timestamps) {
      this.touchTimeStamps(args.inputItems, "updated_at");
    }
  }

  /**
   * Parse data from database to Model instance.
   * We can get custom attribute here by running getXxxAttribute methods.
   */
  $parseDatabaseJson(json: Pojo): Pojo {
    json = super.$parseDatabaseJson(json);

    this.#fromDb = true;
    // set original json, so we can remove non original later.
    this.#original = { ...json };
    // attach json to attributes, so it can be modified by user.
    this.attributes = { ...json };

    // set enumerable true if getter or setter keys includes in attributes.
    [...this.#getters, ...this.#setters]
      .map((key) => Str.snake(key))
      .forEach((attribute) => {
        if (
          Object.keys(this.attributes).includes(attribute) &&
          !(this.constructor as any).hidden.includes(attribute)
        ) {
          Object.defineProperty(this, attribute, {
            enumerable: true,
          });
        }
      });

    return this.attributes;
  }

  /**
   * Format data from internal to external
   * this will run on when toJson method is called.
   */
  $formatJson(json: Pojo): Pojo {
    json = super.$formatJson(json);
    this.#getters.forEach((attribute) => {
      // get original database keys from json.attributes
      const attributeKeys = Object.keys(json.attributes);

      const snakeAttribute = Str.snake(attribute);

      // if attribute listed in appends or attribute is real,
      // just update attribute directly by run getter
      if (
        (this.constructor as any).appends.includes(snakeAttribute) ||
        attributeKeys.includes(snakeAttribute)
      ) {
        json[snakeAttribute] = this[snakeAttribute];
      }
    });

    // delete attributes, so not exposed to external data
    delete json.attributes;

    return json;
  }

  /**
   * Format json from internal to database.
   */
  $formatDatabaseJson(json: Pojo): Pojo {
    json = super.$formatDatabaseJson(json);
    json = { ...json, ...json.attributes };

    //remove non original attributes.
    const originalKeys = Object.keys(this.#original);
    if (originalKeys.length > 0) {
      for (const key in json) {
        if (!originalKeys.includes(key)) {
          delete json[key];
        }
      }
    }

    // this is necessary for insert action
    delete json.attributes;

    return json;
  }

  protected static touchTimeStamps(inputItems: any[], key: string) {
    inputItems.map((input) => {
      input[key] = new Date();
      return input;
    });
  }

  /**
   * filter input from fillable and guarded value.
   */
  protected static filterInput(inputItems: any[]) {
    let isSaveAction = false;
    inputItems.map((input: Model) => {
      if (Object.keys(input).includes("_isSaveAction")) {
        isSaveAction = input._isSaveAction;
        delete input._isSaveAction;
      }
      if (Object.keys(input).includes("_original")) {
        input.setOriginal(input._original);
        delete input._original;
      }
      return input;
    });

    // if fillable array is set,
    // reject input that not listed in fillable array
    if (this.fillable.length > 0 && !isSaveAction) {
      inputItems.map((input) => {
        Object.keys(input).forEach((key) => {
          if (key == "attributes") return input;
          if (!this.fillable.includes(key)) {
            delete input[key];
          }
        });
        return input;
      });
    }

    // if guarded array is set,
    // reject all input that listed in guarded array.
    if (this.guarded.length > 0 && !isSaveAction) {
      inputItems.map((input) => {
        this.guarded.forEach((key) => {
          delete input[key];
        });
        return input;
      });
    }
  }

  public async save() {
    let data: ObjectOf<any> = {};
    const mode = this.#fromDb ? "patch" : "insert";

    if (mode == "patch") {
      Object.keys(this.attributes).forEach((key) => {
        if (this.#getters.includes(Str.studly(key))) {
          data[key] = this.attributes[key];
        } else {
          data[key] = this[key];
        }
      });
    } else {
      data = { ...this };
      Object.keys(data).forEach((key) => {
        if (this.#getters.includes(Str.studly(key))) {
          delete data[key];
        }
      });
      data = { ...data, ...this.attributes };
      this.#original = { ...data };
      delete this.#original.attributes;
    }
    data._original = this.#original;
    data._isSaveAction = true;
    return await this.$query()[mode](data);
  }

  public getOriginal() {
    return this.#original;
  }

  public setOriginal(original: any) {
    this.#original = original;
  }
}

export class ExtendedModel extends Model {}

export default Model;
